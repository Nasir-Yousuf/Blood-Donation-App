'use client';

import { Provider } from 'react-redux';
import { store } from './index';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';

export default function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </ThemeProvider>
    </Provider>
  );
}
