// import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';


// // Your custom light theme
// export const customLightTheme = {
//   ...MD3LightTheme,
//   colors: {
//     ...MD3LightTheme.colors,
//     // Example values – generate proper ones using Material Theme Builder
//     surfaceContainer: '#000',         // Common container background
//     surfaceContainerLowest: '#FFFFFF',   // Lowest elevation (pure white in light)
//     surfaceContainerLow: '#F0F0F0',
//     surfaceContainerHigh: '#EAEAEA',
//     surfaceContainerHighest: '#E0E0E0',
//   },
// };

// // Custom dark theme
// export const customDarkTheme = {
//   ...MD3DarkTheme,
//   colors: {
//     ...MD3DarkTheme.colors,
//     surfaceContainer: '#1E1E1E',
//     surfaceContainerLowest: '#0F0F0F',
//     surfaceContainerLow: '#181818',
//     surfaceContainerHigh: '#282828',
//     surfaceContainerHighest: '#323232',
//   },
// };


// import {
//   MD3LightTheme,
//   MD3DarkTheme,
//   MD3Theme,
// } from 'react-native-paper';

// export type AppColors = MD3Theme['colors'] & {
//   surfaceContainer: string;
//   surfaceContainerLowest: string;
//   surfaceContainerLow: string;
//   surfaceContainerHigh: string;
//   surfaceContainerHighest: string;
//   secondaryContainer: string;
// };

// export type AppTheme = MD3Theme & {
//   colors: AppColors;
// };

// export const customLightTheme: AppTheme = {
//   ...MD3LightTheme,
//   colors: {
//     ...MD3LightTheme.colors,
//     surfaceContainer: '#000',
//     surfaceContainerLowest: '#FFFFFF',
//     surfaceContainerLow: '#F0F0F0',
//     surfaceContainerHigh: '#EAEAEA',
//     surfaceContainerHighest: '#E0E0E0',
//     secondaryContainer: '#025043',
//     surface: '#F0F0F0',
//   },
// };

// export const customDarkTheme: AppTheme = {
//   ...MD3DarkTheme,
//   colors: {
//     ...MD3DarkTheme.colors,
//     surfaceContainer: '#1E1E1E',
//     surfaceContainerLowest: '#0F0F0F',
//     surfaceContainerLow: '#181818',
//     surfaceContainerHigh: '#282828',
//     surfaceContainerHighest: '#323232',
//     secondaryContainer: '#025043',
//     surface: '#F0F0F0',
//   },
// };


import { MD3LightTheme, MD3DarkTheme, MD3Theme } from 'react-native-paper';

// Define custom colors for better visual comfort
export type AppColors = MD3Theme['colors'] & {
  surfaceContainer: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;

  primaryContainer: string;
  secondaryContainer: string;
  tertiaryContainer: string;

  errorContainer: string;
  outlineVariant: string;
  shadow: string;
};

export type AppTheme = MD3Theme & {
  colors: AppColors;
};

// Light theme (soft, warm tones)
export const customLightTheme: AppTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,

    // Surface / backgrounds
    surfaceContainerLowest: '#FFFFFF',
    surfaceContainerLow: '#F7F6F3',
    surfaceContainer: '#F0EFEA',
    surfaceContainerHigh: '#E6E4DD',
    surfaceContainerHighest: '#DCD9CE',

    // Primary / accent
    primaryContainer: '#A3C9A8', // soft green
    secondaryContainer: '#F2D8B3', // soft peach
    tertiaryContainer: '#C7D9E8', // soft blue

    // Error / warning
    errorContainer: '#F9D5D3', // soft red

    // Misc
    outlineVariant: '#D3D3D3',
    shadow: 'rgba(0,0,0,0.08)',
  },
};

// Dark theme (soft dark, not harsh black)
export const customDarkTheme: AppTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,

    // Surface / backgrounds
    surfaceContainerLowest: '#121212',
    surfaceContainerLow: '#1C1C1C',
    surfaceContainer: '#222222',
    surfaceContainerHigh: '#2C2C2C',
    surfaceContainerHighest: '#353535',

    // Primary / accent
    primaryContainer: '#4A7C59', // muted green
    secondaryContainer: '#A57C5D', // muted peach
    tertiaryContainer: '#5C7B8A', // muted blue

    // Error / warning
    errorContainer: '#8B2D2D', // muted red

    // Misc
    outlineVariant: '#555555',
    shadow: 'rgba(0,0,0,0.2)',
  },
};

