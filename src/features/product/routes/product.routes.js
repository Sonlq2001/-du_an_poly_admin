import { lazy } from "react";
const ProductScreen = lazy(() => import("../screens/ProductScreen"));
const PRODUCT_SCREEN = {
  id: "id_product",
  path: "/product-list",
  component: ProductScreen,
};
export const PRODUCT_LIST_ROUTES = [PRODUCT_SCREEN];
