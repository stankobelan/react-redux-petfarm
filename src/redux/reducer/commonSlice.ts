import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotificationMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  autoHide?: boolean;
  duration?: number;
}

export interface CommonState {
  notifications: NotificationMessage[];
  isMenuOpen: boolean;
  globalLoading: boolean;
  theme: 'light' | 'dark';
}

const initialState: CommonState = {
  notifications: [],
  isMenuOpen: false,
  globalLoading: false,
  theme: 'light',
};

/**
 * Common Redux slice for application-wide state
 */
const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Omit<NotificationMessage, 'id'>>) {
      const id = Date.now().toString();
      state.notifications.push({
        ...action.payload,
        id,
        autoHide: action.payload.autoHide ?? true,
        duration: action.payload.duration ?? 5000,
      });
    },

    removeNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },

    clearAllNotifications(state) {
      state.notifications = [];
    },

    setGlobalLoading(state, action: PayloadAction<boolean>) {
      state.globalLoading = action.payload;
    },

    toggleMenu(state) {
      state.isMenuOpen = !state.isMenuOpen;
    },

    setMenuOpen(state, action: PayloadAction<boolean>) {
      state.isMenuOpen = action.payload;
    },

    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },

    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload;
    },
  },
});

export const {
  addNotification,
  removeNotification,
  clearAllNotifications,
  setGlobalLoading,
  toggleMenu,
  setMenuOpen,
  toggleTheme,
  setTheme,
} = commonSlice.actions;

export default commonSlice.reducer;
