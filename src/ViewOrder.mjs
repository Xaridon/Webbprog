import React from 'react';


function ViewOrder(props){
    let bigPrice = 0;
    return(
        <>
        <div className="row h-200 p-5 bg-light border rounded-3">
        {props.shoppingCart.map((salad) => {
            bigPrice += salad.getPrice();
            return(
            <div key={salad.id}>
                <p>
                   {Object.keys(salad.ingredients).join(', ')} {salad.getPrice()}kr
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