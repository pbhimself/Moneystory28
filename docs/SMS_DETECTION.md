# SMS Detection

MoneyStory parses payment-like SMS text on-device, extracts amount, merchant, date, and payment method, and asks the user to review the detected payment before saving it.

## Paste Mode

Go to Profile -> SMS detection, paste a bank or UPI message, and tap Detect payment.

## Internal APK

Set `EXPO_PUBLIC_ENABLE_SMS_DETECTION=true` for the preview EAS profile. The config plugin adds `READ_SMS` and `RECEIVE_SMS` only for that build.

## Privacy

SMS bodies are never sent to Supabase. A SHA-256 fingerprint is stored locally in Expo Secure Store to prevent duplicate prompts.

## Supported Formats

The parser supports common debit, UPI, POS, card, ATM, NEFT, IMPS, auto-debit, EMI, and subscription messages containing `Rs`, `INR`, or `₹`.

## Limitations

Expo Go cannot load custom native SMS modules. Google Play restricts broad SMS permission usage; keep SMS builds internal unless policy requirements are met.
