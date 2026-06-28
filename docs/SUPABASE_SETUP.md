# Supabase Setup

1. Create a Supabase project.
2. Copy the project URL and anon public key into `.env`.
3. Open the Supabase SQL editor and run `supabase/schema.sql`.
4. Run `supabase/rls-policies.sql`.
5. Confirm triggers exist for profile creation, default categories, and `updated_at`.
6. Enable email authentication in the dashboard.
7. Add `moneystory://reset-password` as a password reset redirect URL.

Do not put the service-role key in the mobile app.
