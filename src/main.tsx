import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import SuspenseContent from '@/components/ui/suspens-content';
import store from '@/stores/';

const App = lazy(() => import('./app'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<SuspenseContent />}>
        <Provider store={store}>
          <App />

          {/* <div></div> */}
        </Provider>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
);
