import { createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import { menuLoader } from "./loaders/menuLoader";
import { orderLoader } from "./loaders/orderLoader";
import { action as createOrderAction } from "./services/createOrderAction";
import { action as updateOrderAction } from "./services/updateOrderAction";
import { action as deleteOrderAction } from "./services/deleteOrderAction";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: "/cart", element: <Cart /> },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:order_id",
        element: <Order />,
        loader: orderLoader,
        action: async (args) => {
          if (args.request.method === "PATCH") {
            return updateOrderAction(args);
          } else if (args.request.method === "DELETE") {
            return deleteOrderAction(args);
          }
        },
      },
    ],
  },
]);

export default router;
