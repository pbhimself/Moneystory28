create extension if not exists pgcrypto;

create or replace function public.update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  avatar_url text,
  preferred_currency text not null default 'INR',
  onboarding_completed boolean not null default false,
  onboarding_step integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.salary_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  monthly_salary_paise bigint not null check (monthly_salary_paise > 0),
  fixed_monthly_expense_paise bigint not null default 0,
  salary_received_day integer not null check (salary_received_day between 1 and 28),
  currency text not null default 'INR',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

create table if not exists public.weekly_targets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  week_start date not null,
  target_amount_paise bigint not null check (target_amount_paise > 0),
  currency text not null default 'INR',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, week_start)
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  icon text not null,
  color text not null,
  is_default boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (user_id, name)
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  amount_paise bigint not null check (amount_paise > 0),
  description text not null,
  payment_method text not null check (payment_method in ('cash','upi','debit_card','credit_card','bank_transfer','wallet','other')),
  expense_date timestamptz not null,
  source text not null default 'manual' check (source in ('manual','sms_detected','imported')),
  merchant_name text,
  sms_fingerprint text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists expenses_user_id_idx on public.expenses(user_id);
create index if not exists expenses_user_date_idx on public.expenses(user_id, expense_date);
create index if not exists expenses_user_category_idx on public.expenses(user_id, category_id);
create index if not exists expenses_source_idx on public.expenses(source);
create index if not exists weekly_targets_user_week_idx on public.weekly_targets(user_id, week_start);
create index if not exists salary_settings_user_idx on public.salary_settings(user_id);

drop trigger if exists update_profiles_updated_at on public.profiles;
create trigger update_profiles_updated_at before update on public.profiles for each row execute function public.update_updated_at();
drop trigger if exists update_salary_settings_updated_at on public.salary_settings;
create trigger update_salary_settings_updated_at before update on public.salary_settings for each row execute function public.update_updated_at();
drop trigger if exists update_weekly_targets_updated_at on public.weekly_targets;
create trigger update_weekly_targets_updated_at before update on public.weekly_targets for each row execute function public.update_updated_at();
drop trigger if exists update_expenses_updated_at on public.expenses;
create trigger update_expenses_updated_at before update on public.expenses for each row execute function public.update_updated_at();

create or replace function public.create_profile_on_signup()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop trigger if exists create_profile_on_signup on auth.users;
create trigger create_profile_on_signup after insert on auth.users for each row execute function public.create_profile_on_signup();

create or replace function public.create_default_categories()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.categories (user_id, name, icon, color, is_default, sort_order) values
    (new.id, 'Food', 'utensils', '#F06292', true, 1),
    (new.id, 'Travel', 'car', '#E2C07A', true, 2),
    (new.id, 'Shopping', 'shopping-bag', '#22D3EE', true, 3),
    (new.id, 'Bills', 'zap', '#F4706A', true, 4),
    (new.id, 'Rent', 'home', '#7B6EF6', true, 5),
    (new.id, 'Entertainment', 'film', '#A99EF8', true, 6),
    (new.id, 'Health', 'heart', '#34D399', true, 7),
    (new.id, 'Education', 'book', '#F5A623', true, 8),
    (new.id, 'Others', 'circle', '#5A6A82', true, 9);
  return new;
end;
$$;

drop trigger if exists create_default_categories on public.profiles;
create trigger create_default_categories after insert on public.profiles for each row execute function public.create_default_categories();
