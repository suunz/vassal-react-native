import { useTheme } from 'react-native-paper';
import type { AppTheme } from './appTheme';

export const useAppTheme = () => {
  return useTheme<AppTheme>();
};
