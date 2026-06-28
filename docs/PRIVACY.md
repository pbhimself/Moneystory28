# Privacy

MoneyStory stores account profile, salary settings, weekly targets, categories, and expenses in Supabase.

SMS message contents are not uploaded or shared. Paste-mode parsing runs locally. Duplicate prevention stores only a local SHA-256 fingerprint in Expo Secure Store.

Users can delete expenses in the app. Full account deletion should be performed from Supabase admin tooling or an account deletion flow added to production policy.

Supabase data residency depends on the region chosen when creating the Supabase project.
