import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import i18n from '@/shared/i18n';

type ThemeMode = 'light' | 'dark';
type Language = 'en' | 'ru';

interface SettingsState {
  theme: ThemeMode;
  language: Language;
  pageSize: number;
}

const loadSettings = (): SettingsState => {
  const saved = localStorage.getItem('settings');
  if (saved) {
    try {
      return JSON.parse(saved) as SettingsState;
    } catch {
      // fall through to defaults
    }
  }
  return {
    theme: 'light',
    language: (localStorage.getItem('language') as Language) || 'en',
    pageSize: 12,
  };
};

const initialState: SettingsState = loadSettings();

const persistSettings = (state: SettingsState) => {
  localStorage.setItem('settings', JSON.stringify(state));
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload;
      persistSettings(state);
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      i18n.changeLanguage(action.payload);
      localStorage.setItem('language', action.payload);
      persistSettings(state);
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      persistSettings(state);
    },
  },
});

export const { setTheme, setLanguage, setPageSize } = settingsSlice.actions;
export default settingsSlice.reducer;
