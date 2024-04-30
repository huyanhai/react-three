import { useLocation, Navigate } from "react-router-dom";
import { ISyncRoute } from "./types";

import { routes } from "./routes";

const searchRoute = (path: string, routes: ISyncRoute[]): ISyncRoute => {
  let route = {};
  for (const item of routes) {
    if (path === (item.path?.startsWith("/") ? item.path : `/${item.path}`)) {
      return item;
    }
    if (item.children) {
      const result = searchRoute(path, item.children);
      if (Object.keys(result).length > 0) {
        route = result;
      }
    }
  }
  return route;
};

const AuthRouter = (props: { children: JSX.Element }) => {
  const { pathname } = useLocation();

  const route = searchRoute(pathname, routes);
  if (route.meta.title) {
    document.title = route.meta.title;
  }

  if (!route.meta.auth) return props.children;

  //   登录
  const token = "123";

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  //   权限
  const routerList = ["/home", "/403", "/"];

  if (!routerList.includes(pathname)) {
    return <Navigate to="/403" />;
  }

  return props.children;
};

export default AuthRouter;
