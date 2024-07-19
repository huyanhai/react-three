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
        path: 'day/1',
        component: lazy(() => import('@/views/day1/index')),
        meta: {
          title: '首页',
          auth: false
        }
      },
      {
        path: 'day/2',
        component: lazy(() => import('@/views/day2/index')),
        meta: {
          title: '首页',
          auth: false
        }
      },
    ]
  },
  {
    path: '/403',
    component: lazy(() => import('@/views/403')),
    meta: {
      title: '403',
      auth: false
    }
  }
];
