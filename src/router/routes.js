export default [
  {
    path: '/',
    component: () => import('layouts/Home'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/Home')}
    ]
  }
];
