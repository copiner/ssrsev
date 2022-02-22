import Fruit from '../components/fruit/index';
import asyncComp from '../common/asyncComp';

export default [{
  component: Fruit,
  path: '/',
  exact: true,
  name: 'Fruits'
}, {
  component: asyncComp(() => import('../components/apple/index')),
  path: '/apple',
  exact: true,
  name: 'Apple'
}, {
  component: asyncComp(() => import('../components/banana/index')),
  path: '/banana',
  exact: true,
  name: 'Banana'
}, {
  component: asyncComp(() => import('../components/orange/index')),
  path: '/orange',
  exact: true,
  name: 'Orange',
  routes:[
      {
        path: "/orange/pitch",
        component: asyncComp(() => import('../components/pitch/index')),
      },
  ]
}];
