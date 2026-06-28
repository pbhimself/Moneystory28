# MoneyStory Setup

## Prerequisites

- Node 20 LTS recommended
- pnpm (`npm install -g pnpm`) or npm
- Expo CLI through `npx expo`
- EAS CLI (`npm install -g eas-cli`)
- Android Studio with an emulator or a physical Android device

## Install

```bash
pnpm install
```

If pnpm is not installed:

```bash
npm install
```

## Environment

Copy `.env.example` to `.env` and fill:

```bash
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_ENABLE_SMS_DETECTION=false
EXPO_PUBLIC_APP_ENV=development
```

## Run

```bash
npx expo start
npx expo run:android
```
