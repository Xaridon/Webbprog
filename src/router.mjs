import { createBrowserRouter, Navigate } from "react-router-dom";
import App from './App.mjs';
import ComposeSalad from "./ComposeSalad.mjs";
import ViewOrder from "./ViewOrder.mjs";
import HomePage from "./HomePage.mjs";
import PageNotFound from "./PageNotFound.mjs";
import Confirm from "./Confirm.mjs";

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
        path: "/compose-salad",
        element: <ComposeSalad/>
      },
      {
        path: "/view-order",
        element: <ViewOrder />,
        children: [
          {
            path: "/view-order/confirm/:uuid",
            element: <Confirm />
          }
        ]
      },
      { /*
        path: "confirm/id:",
        element: element=<Contact />
      */}, 
      {
        path: "/404",
        element: <PageNotFound/>
      },
      {
        path: "*",
        element: <Navigate to="/404"/>
      }
    ]
  },
]);
export default router