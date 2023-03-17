

const router = [
  {
    path: "/",
    name:"login",
    component: () => import('@/pages/Login')
  },
      {
        path: '/home',
        name: 'home',
        component: () => import('@/components/Home'),
        meta:{ auth : false}
      },
]


export default router


