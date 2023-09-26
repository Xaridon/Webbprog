import { createBrowserRouter, useRouteError } from "react-router-dom";
import App from './App';
import ComposeSalad from "./ComposeSalad.mjs";
import ViewOrder from "./ViewOrder.mjs";
import HomePage from "./HomePage.mjs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage/>
      },
      {
        path: "compose-salad",
        element: <ComposeSalad/>
      },
      {
        path: "view-order",
        element: <ViewOrder/>
      }
    ]
  },
]);
export default router