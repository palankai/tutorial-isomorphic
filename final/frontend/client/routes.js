import Index from 'containers/Index';
import View from 'containers/View';
import Submit from 'containers/Submit';


const routes = [
  { path: '/view',
    component: View
  },
  { path: '/submit',
    component: Submit
  },
  { path: '/',
    component: Index
  }
];

export default routes;
