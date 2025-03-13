# RVKapp v1.2.0

RVKapp is a mobile application built with React Native and Expo that provides scanning functionality with a modern, user-friendly interface.

## Features

- **Scanning Interface**: Full-screen camera view with a semi-transparent overlay for improved visibility
- **Custom Gold Coin Icon**: Distinctive app icon with a gold theme
- **Tab Navigation**: Easy navigation between different sections of the app
- **Modern UI**: Clean, intuitive interface designed for ease of use

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## Development

### Camera Module

The app uses Expo Camera for the scanning functionality. The camera view has been optimized to:
- Occupy the full screen
- Include a 50% transparent overlay
- Provide intuitive controls for capturing images

### App Icons

The app uses a custom gold coin icon. If you need to regenerate the icons:

```bash
node scripts/generate-icons.js
```

This will convert the SVG source file to PNG icons for various app contexts.

## Version History

See the [CHANGELOG.md](./CHANGELOG.md) file for a detailed history of changes.

## Built With

- [React Native](https://reactnative.dev/) - The framework used
- [Expo](https://expo.dev) - Development platform
- [Expo Router](https://docs.expo.dev/router/introduction) - For file-based routing
- [Expo Camera](https://docs.expo.dev/versions/latest/sdk/camera/) - For camera functionality
