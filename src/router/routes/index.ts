import type { ISyncRoute } from '../types';

import { ComponentType, lazy } from 'react';

const dynamicImport = () => {
  const routes: ISyncRoute[] = [];
  const paths = import.meta.glob<{ default: ComponentType }>(
    '@/views/day*/index.tsx'
  );

  Object.keys(paths).forEach(async (key) => {
    const keyArray = key.split('/');
    const name = keyArray[keyArray.length - 2];

    routes.push({
      path: name,
      component: lazy(() => paths[key]()),
      meta: {
        title: name,
        auth: false
      }
    });
  });
  return routes;
};

export const routes: ISyncRoute[] = [
  {
    path: '/',
    component: lazy(() => import('@/layouts/Index')),
    meta: {
      title: '首页',
      auth: true
    },
    children: [...dynamicImport()]
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
