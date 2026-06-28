# APK Build

1. Install EAS CLI:

```bash
npm install -g eas-cli
```

2. Login:

```bash
eas login
```

3. Configure the project:

```bash
eas build:configure
```

4. Build preview APK:

```bash
eas build -p android --profile preview
```

5. Download the APK from the EAS dashboard.
6. Install on a device:

```bash
adb install moneystory.apk
```

You can also scan the QR code from the EAS dashboard.
