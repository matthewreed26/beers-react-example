import { createBrowserRouter } from 'react-router-dom';
import Homepage from '@/common/primary/homepage';
import ChatsView from '@/common/primary/chats';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/essentials',
    element: <ChatsView />,
  },
]);

export default Router;
