import React from "react";
import Aux_ from "../../../hoc/Aux_"
import Button from "../../UI/Button/Button"

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients).map(igKey => {
        return (
            <li key={igKey}>
            <span style = {{textTransform : "capitalize"}}>{igKey}</span>: {props.ingredients[igKey]}
            </li>)
            
    });
     return (
         <Aux_>
             <h3>Your Order</h3>
             <p>A delicious burger with a following ingredients:</p>
             <ul>
                {ingredientsSummary}
             </ul>
             <p><strong>Total Price Rs: {props.price.toFixed(2)}</strong></p>
             <p>Continue to Checkout ?</p>
             <Button btnType = 'Danger' clicked = {props.purchaseCanceled}>CANCEL</Button>
             <Button btnType = 'Success' clicked = {props.purchaseContinued}>CONTINUE</Button>
         </Aux_>
     );
}


export default orderSummary;