import React from 'react';


function ViewOrder(props){

    function saladRemove(e, name){
        let newSaladArray = props.shoppingCart.filter((word) => word !== name)
        props.setSalads(newSaladArray);
    }


    let bigPrice = 0;
    return(
        <>
        <div className="row h-200 p-5 bg-light border rounded-3">
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
        </>
    );
}


export default ViewOrder;