import IndexScene from 'scenes/Index';
import AboutScene from 'scenes/About';
import SubmitScene from 'scenes/Submit';
import ListScene from 'scenes/List';
import Root from 'components/Root';

import { fetchFromServer } from 'store/actions';

const routes = [
  { component: Root,
    routes: [
      { path: '/',
        component: IndexScene,
        exact: true
      },
      { path: '/about',
        component: AboutScene
      },
      { path: '/submit',
        component: SubmitScene
      },
      { path: '/list',
        component: ListScene,
        action(api) {
          return fetchFromServer(api);
        }
      }
    ]
  }
];

export default routes;
