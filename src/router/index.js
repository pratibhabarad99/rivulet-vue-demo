
export default [
  {
    path: "/",
    name:"login",
    component: () => import('@/pages/Login')
  },
      {
        path: '/home',
        name: 'home',
        component: () => import('@/components/Home')
      },
]



