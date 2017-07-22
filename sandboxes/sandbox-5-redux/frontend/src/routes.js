import IndexScene from './scenes/Index';
import AboutScene from './scenes/About';
import SubmitScene from './scenes/Submit';
import Root from './components/Root';

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
      }
    ]
  }
];

export default routes;
