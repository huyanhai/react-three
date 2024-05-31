import type { ISyncRoute } from '../types';

import { lazy } from 'react';

export const routes: ISyncRoute[] = [
  {
    path: '/',
    component: lazy(() => import('@/layouts/Index')),
    meta: {
      title: '首页',
      auth: true
    },
    children: [
      {
        path: 'login',
        component: lazy(() => import('@/views/Login')),
        meta: {
          title: '登录',
          auth: false
        }
      },
      {
        path: 'home',
        component: lazy(() => import('@/views/Home')),
        meta: {
          title: '首页',
          auth: true
        }
      },
      {
        path: 'about',
        component: lazy(() => import('@/views/About')),
        meta: {
          title: '关于',
          auth: true
        }
      },
      {
        path: 'shader',
        component: lazy(() => import('@/views/shader/index')),
        meta: {
          title: 'shader',
          auth: false
        }
      },
      {
        path: 'shader1',
        component: lazy(() => import('@/views/shader1/index')),
        meta: {
          title: 'shader1',
          auth: false
        }
      },
      {
        path: 'ship',
        component: lazy(() => import('@/views/ship/index')),
        meta: {
          title: 'ship',
          auth: false
        }
      },
      {
        path: 'screen',
        component: lazy(() => import('@/views/screen/index')),
        meta: {
          title: 'screen',
          auth: false
        }
      },
      {
        path: 'human',
        component: lazy(() => import('@/views/human/index')),
        meta: {
          title: 'human',
          auth: false
        }
      }
    ]
  },
  {
    path: '/403',
    component: lazy(() => import('@/views/403')),
    meta: {
      title: '403',
      auth: true
    }
  }
];
