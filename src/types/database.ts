export type PaymentMethod =
  | "cash"
  | "upi"
  | "debit_card"
  | "credit_card"
  | "bank_transfer"
  | "wallet"
  | "other";

export type ExpenseSource = "manual" | "sms_detected" | "imported";

export type Tables = {
  profiles: {
    Row: {
      id: string;
      full_name: string;
      avatar_url: string | null;
      preferred_currency: string;
      onboarding_completed: boolean;
      onboarding_step: number;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id: string;
      full_name: string;
      avatar_url?: string | null;
      preferred_currency?: string;
      onboarding_completed?: boolean;
      onboarding_step?: number;
    };
    Update: Partial<Tables["profiles"]["Insert"]>;
  };
  salary_settings: {
    Row: {
      id: string;
      user_id: string;
      monthly_salary_paise: number;
      fixed_monthly_expense_paise: number;
      salary_received_day: number;
      currency: string;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      user_id: string;
      monthly_salary_paise: number;
      fixed_monthly_expense_paise?: number;
      salary_received_day: number;
      currency?: string;
    };
    Update: Partial<Tables["salary_settings"]["Insert"]>;
  };
  weekly_targets: {
    Row: {
      id: string;
      user_id: string;
      week_start: string;
      target_amount_paise: number;
      currency: string;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      user_id: string;
      week_start: string;
      target_amount_paise: number;
      currency?: string;
    };
    Update: Partial<Tables["weekly_targets"]["Insert"]>;
  };
  categories: {
    Row: {
      id: string;
      user_id: string;
      name: string;
      icon: string;
      color: string;
      is_default: boolean;
      sort_order: number;
      created_at: string;
    };
    Insert: {
      user_id: string;
      name: string;
      icon: string;
      color: string;
      is_default?: boolean;
      sort_order?: number;
    };
    Update: Partial<Tables["categories"]["Insert"]>;
  };
  expenses: {
    Row: {
      id: string;
      user_id: string;
      category_id: string | null;
      amount_paise: number;
      description: string;
      payment_method: PaymentMethod;
      expense_date: string;
      source: ExpenseSource;
      merchant_name: string | null;
      sms_fingerprint: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      user_id: string;
      category_id?: string | null;
      amount_paise: number;
      description: string;
      payment_method: PaymentMethod;
      expense_date: string;
      source?: ExpenseSource;
      merchant_name?: string | null;
      sms_fingerprint?: string | null;
    };
    Update: Partial<Tables["expenses"]["Insert"]>;
  };
};

export type Database = {
  public: {
    Tables: Tables;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Profile = Tables["profiles"]["Row"];
export type SalarySettings = Tables["salary_settings"]["Row"];
export type WeeklyTarget = Tables["weekly_targets"]["Row"];
export type Category = Tables["categories"]["Row"];
export type Expense = Tables["expenses"]["Row"];
