import { RouterProvider } from 'react-router-dom';
import AppContext, { Provide } from './AppContext';
import { Router } from '@remix-run/router';

interface AppProps {
  appProvide: Provide;
  router: Router;
}

function App(props: AppProps) {
  return (
    <AppContext.Provider value={props.appProvide}>
      <RouterProvider router={props.router} />
    </AppContext.Provider>
  );
}

export default App;
