import { createBrowserRouter } from 'react-router-dom';
import Homepage from '@/common/primary/homepage';
import EssentialsView from '@/common/primary/essentials';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/essentials',
    element: <EssentialsView />,
  },
]);

export default Router;
