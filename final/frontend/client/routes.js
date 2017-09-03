import Index from 'containers/Index';
import View from 'containers/View';
import Submit from 'containers/Submit';
import ErrorPage from 'components/ErrorPage';


const routes = [
  { path: '/view',
    component: View
  },
  { path: '/submit',
    component: Submit
  },
  { path: '/',
    component: Index,
    exact: true
  },
  { path: '*',
    component: ErrorPage
  }
];

export default routes;
