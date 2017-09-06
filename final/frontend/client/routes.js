import Index from 'containers/Index';
import View from 'containers/View';
import Submit from 'containers/Submit';
import ErrorPage from 'components/ErrorPage';

import RootLayout from 'components/RootLayout';
import ContentLayout from 'components/ContentLayout';

import { requestExcerpts } from 'store/actions';


const routes = [
  { component: RootLayout,
    routes: [
      { path: '/submit',
        component: Submit
      },
      { component: ContentLayout,
        routes: [
          { path: '/view',
            component: View
          },
          { path: '/',
            component: Index,
            exact: true,
            action: requestExcerpts
          },
          { path: '*',
            component: ErrorPage
          }
        ]
      }
    ]
  }
];

export default routes;
