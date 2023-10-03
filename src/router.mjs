import { createBrowserRouter, useLoaderData, Navigate } from "react-router-dom";
import App from './App.mjs';
import ComposeSalad from "./ComposeSalad.mjs";
import ViewOrder from "./ViewOrder.mjs";
import HomePage from "./HomePage.mjs";
import PageNotFound from "./PageNotFound.mjs";
import Confirm from "./Confirm.mjs"
import fetchInventory from "./fetchInventory.mjs";

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
        loader: inventoryLoader,
        Component: ComposeSalad
      },
      {
        path: "/view-order",
        element: <ViewOrder/>,
        children: [
          {
            path: "/view-order/confirm/:uuid",
            element: <Confirm/>
          }
        ]
      },
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

async function inventoryLoader() {
  try {
    const inventory = await fetchInventory();
    return inventory
  } catch (error) {
    console.error("Problem fetching inventory", error)
  }

}

export default router