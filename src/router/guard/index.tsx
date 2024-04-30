import type { ISyncRoute } from "../types";

import React from "react";
import type { RouteObject } from "react-router-dom";
import { Suspense } from "react";

const initElement = (Component: React.LazyExoticComponent<any>) => {
  return (
    <Suspense fallback={<div>加载中...</div>}>
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
      children: r.children && initRouterTable(r.children),
    });
  });

  return routeTable;
};
