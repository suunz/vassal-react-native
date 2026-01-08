import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// First, extend the TypeScript interface for type safety (optional but recommended)
declare module 'react-native-paper' {
  interface MD3Colors {
    surfaceContainer?: string;
    surfaceContainerLowest?: string;
    surfaceContainerLow?: string;
    surfaceContainerHigh?: string;
    surfaceContainerHighest?: string;
    // Add any other custom tokens here
  }
}

// Your custom light theme
export const customLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    // Example values – generate proper ones using Material Theme Builder
    surfaceContainer: '#000',         // Common container background
    surfaceContainerLowest: '#FFFFFF',   // Lowest elevation (pure white in light)
    surfaceContainerLow: '#F0F0F0',
    surfaceContainerHigh: '#EAEAEA',
    surfaceContainerHighest: '#E0E0E0',
  },
};

// Custom dark theme
export const customDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    surfaceContainer: '#1E1E1E',
    surfaceContainerLowest: '#0F0F0F',
    surfaceContainerLow: '#181818',
    surfaceContainerHigh: '#282828',
    surfaceContainerHighest: '#323232',
  },
};