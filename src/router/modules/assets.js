/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const assetsRouter = {
  path: '/assets',
  component: Layout,
  redirect: '/assets/assets',
  name: 'Asset',
  meta: {
    title: '资产信息',
    icon: 'nested'
  },
  children: [
    {
      path: 'assets',
      //当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
      redirect: 'noRedirect',
      meta: { title: '资产管理',roles: ['admin', 'editor'] },
      component: () => import('@/views/assets/asset/index'),
      children: [
        {
          path: '',
          name: 'AssetList',
          breadcrumb: false,  //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
          component: () => import('@/views/assets/asset/AssetList'),
          meta: { title: '资产列表', affix: false, activeMenu: '/assets/assets', roles: ['admin', 'editor'] },
        },
        {
          path:'create',
          name:'AssetCreate',
          // 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
          hidden: true,
          component: ()=>import('@/views/assets/asset/CreateUpdate'),
          meta: {title:'创建资产', affix: false, activeMenu: '/assets/assets', roles: ['admin', 'editor'] },
        },
        {
          path: ':id',
          name: 'AssetDetail',
          hidden: true,
          component: () => import('@/views/assets/asset/AssetDetail'),
          meta: { title: '资产详情', affix: false, activeMenu: '/assets/assets', roles: ['admin', 'editor'] },
        },

        {
          path:':id/update',
          name:'AssetUpdate',
          hidden: true,
          component: ()=>import('@/views/assets/asset/CreateUpdate'),
          meta: {title:'更新资产', affix: false, activeMenu: '/assets/assets', roles: ['admin', 'editor'] },
        }
      ]
    },
    {
      redirect: 'noRedirect',
      path: 'idc',
      meta: { title: 'IDC管理',roles: ['admin', 'editor'] },
      component: () => import('@/views/assets/idc/index'),
      children: [
        {
          path: '',
          name: 'IDCList',
          breadcrumb: false,  //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
          component: () => import('@/views/assets/idc/IdcList'),
          meta: { title: 'IDC列表', affix: false, activeMenu: '/assets/idc', roles: ['admin', 'editor'] },
        },
      ]
    }
  ]
}

export default assetsRouter
