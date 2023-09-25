import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.mjs';
import ComposeSalad from './ComposeSalad.mjs'
import ViewOrder from './ViewOrder.mjs'
import React, {useState} from 'react';

function App() {

  const [salads, setSalads] = useState([]);

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>

      <div className="continer col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Din beställning</h2>
        <ViewOrder shoppingCart={salads} setSalads={setSalads}/>
      </div>
        <div className="row h-200 p-5 bg-light border rounded-3">
          <h2>Välj innehållet i din sallad</h2>
          <ComposeSalad inventory={inventory} saladSubmit={setSalads} salad={salads} />
        </div>
      </div>

      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

export default App;
