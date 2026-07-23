import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from '@/app/redux/store';
import { router } from '@/app/router/routes';
import ThemeProvider from '@/app/providers/theme/ThemeProvider';
import AntdProvider from '@/app/providers/antd/AntdProvider';
import { ReactQueryProvider } from '@/app/providers/react-query/ReactQueryProvider';
import AppInit from '@/app/init/AppInit';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AntdProvider>
          <ReactQueryProvider>
            <AppInit>
              <RouterProvider router={router} />
            </AppInit>
          </ReactQueryProvider>
        </AntdProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

