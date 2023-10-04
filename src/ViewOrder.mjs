import React from 'react';
import { useOutletContext } from "react-router-dom";
import Confirm from './Confirm.mjs';
import { useState } from 'react';



function ViewOrder(){
    const props = useOutletContext();
    function saladRemove(e, name){
        let newSaladArray = props.shoppingCart.filter((word) => word !== name)
        props.setSalads(newSaladArray);
        localStorage.setItem("shoppingCart", JSON.stringify(newSaladArray))
    }
    const [confirmOrder, setConfirmOrder] = useState(null);
    
    const allSalads = (props.shoppingCart.map((salad) => {return(Object.keys(salad.ingredients))}))


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
        {confirmOrder && 
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Order status: </strong>{confirmOrder.status}<br></br>
                <strong>Time of order: </strong>{confirmOrder.timestamp}<br></br>
                <strong>Price: </strong>{confirmOrder.price}kr<br></br>
            </div>}
        </div>
        <button type="button" className="btn btn-primary" onClick={() => handleClick(allSalads).then((response) => {setConfirmOrder(response); localStorage.setItem("shoppingCart", "[]");props.setSalads([])})}>Place order</button>
        </div>
        </>
    );
}



export default ViewOrder;


function handleClick(data){

    return fetch(`http://localhost:8080/orders/`,{

        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then((response) => {
        if(!response.ok) {
            throw new Error(`returned status ${response.status}`);
        }
        return response.json();
    });
    
}