import type { ISyncRoute } from '../types';

import React from 'react';
import type { RouteObject } from 'react-router-dom';
import { Suspense } from 'react';

const initElement = (Component: React.LazyExoticComponent<any>) => {
  return (
    <Suspense
      fallback={
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      }
    >
      <Component />
    </Suspense>
  );
};

export const initRouterTable = (table: ISyncRoute[]): RouteObject[] => {
  let routeTable: RouteObject[] = [];
  table.forEach((r) => {
    routeTable.push({
      path: r.path,
      element: initElement(r.component),
      children: r.children && initRouterTable(r.children)
    });
  });

  return routeTable;
};
