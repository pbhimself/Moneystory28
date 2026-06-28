alter table public.profiles enable row level security;
alter table public.salary_settings enable row level security;
alter table public.weekly_targets enable row level security;
alter table public.categories enable row level security;
alter table public.expenses enable row level security;

drop policy if exists "profiles select own" on public.profiles;
create policy "profiles select own" on public.profiles for select using (auth.uid() = id);
drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "salary settings all own" on public.salary_settings;
create policy "salary settings all own" on public.salary_settings for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "weekly targets all own" on public.weekly_targets;
create policy "weekly targets all own" on public.weekly_targets for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "categories all own" on public.categories;
create policy "categories all own" on public.categories for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "expenses all own" on public.expenses;
create policy "expenses all own" on public.expenses for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
