import type LazyExoticComponent from "react";

export interface ISyncRoute {
  path: string;
  component: LazyExoticComponent<any>;
  meta: {
    title?: string;
    auth?: boolean;
  };
  children?: ISyncRoute[];
}
