import { createBrowserRouter, useLoaderData, Navigate } from "react-router-dom";
import App from './App.mjs';
import ComposeSalad from "./ComposeSalad.mjs";
import ViewOrder from "./ViewOrder.mjs";
import HomePage from "./HomePage.mjs";
import PageNotFound from "./PageNotFound.mjs";
import Confirm from "./Confirm.mjs"

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

  const response = await fetch("http://localhost:8080/foundations");
  const foundationNames = await response.json()
  const foundations = [];

  for (const name of foundationNames) {
    const response = await fetchIngredient("foundations", name);
    const data = await response.json();
    const objectConstructor = {[name] : data}
    foundations.push(objectConstructor);
  }

  console.log(foundations)
  return foundations;

  
  /*const foundations = []
  foundations.push(fetchIngredient("foundations", "Sallad"))
  
  const inventory = await fetchIngredient("foundations", name); //Promise.all([...foundations])
  await new Promise(resolve => setTimeout(resolve, 500));

  return inventory; */
}

async function fetchIngredient(type, name) {
  const response = await fetch(`http://localhost:8080/${type}/${name}`);

  return response;

  /*const inventoryProperties = fetch("http://localhost:8080/"+type+"/"+name);

  const obj = {name : inventoryProperties};
  return obj; */
}

export default router