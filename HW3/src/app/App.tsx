import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppThemeProvider } from './providers/ThemeProvider';
import { AuthInitializer } from './providers/AuthInitializer';
import { ErrorBoundary } from '@/shared/ui';
import { router } from './router';

export const App = () => {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <ErrorBoundary>
          <AuthInitializer>
            <RouterProvider router={router} />
          </AuthInitializer>
        </ErrorBoundary>
      </AppThemeProvider>
    </Provider>
  );
};
