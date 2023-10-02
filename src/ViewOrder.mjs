import React from 'react';
import { useOutletContext } from "react-router-dom";
import Confirm from './Confirm.mjs';


function ViewOrder(){
    const props = useOutletContext();
    function saladRemove(e, name){
        let newSaladArray = props.shoppingCart.filter((word) => word !== name)
        props.setSalads(newSaladArray);
    }


    let bigPrice = 0;
    return(
        <>
        <div className="continer col-12">
        <div className="row h-200 p-5 bg-light border rounded-3">
            <Confirm />
        <h2>Din beställning</h2>

        {props.shoppingCart.map((salad) => {
            bigPrice += salad.getPrice();
            return(
            <div key={salad.id}>
                <p>
                   {Object.keys(salad.ingredients).join(', ')} {salad.getPrice()}kr   <button className="btn btn-danger" onClick={e => saladRemove(e, salad)}>X</button>
                </p>
               
            </div>
        )
        })}
        <h4>Total: {bigPrice}kr</h4>
        </div>
        </div>
        </>
    );
}



export default ViewOrder;