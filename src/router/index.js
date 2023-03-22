

const router = [
      {
        path: "/",
        name:"home",
        component: () => import('../components/Home')
      },
      {
        path: '/details',
        name: 'details',
        component: () => import('../components/DetailPage'),
        meta:{ auth : false}
      },
      {
        path: '/edit',
        name: 'editdetail',
        component: () => import('../components/EditDetails'),
        meta:{ auth : false}
      },
      {
        path: '/add',
        name: 'addpost',
        component: () => import('../components/AddData'),
        meta:{ auth : false}
      },
]


export default router


