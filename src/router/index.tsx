import { Navigate, RouteObject, useRoutes } from "react-router-dom";

import { routes } from "./routes";
import { initRouterTable } from "./guard";

export const routerTable: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/day/1" />,
  },
  ...initRouterTable(routes),
];

export default () => useRoutes(routerTable);
