import React, { Component } from "react";
import Aux_ from "../../../hoc/Aux_/Aux_"
import Button from "../../UI/Button/Button"

class OrderSummary extends Component {
componentDidUpdate(){
    console.log("order summery update");
}

    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients).map(igKey => {
            return (
                <li key={igKey}>
                <span style = {{textTransform : "capitalize"}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>)
                
        });
        return (
            <Aux_>
                        <h3>Your Order</h3>
                        <p>A delicious burger with a following ingredients:</p>
                        <ul>
                            {ingredientsSummary}
                        </ul>
                        <p><strong>Total Price Rs: {this.props.price.toFixed(2)}</strong></p>
                        <p>Continue to Checkout ?</p>
                        <Button btnType = 'Danger' clicked = {this.props.purchaseCanceled}>CANCEL</Button>
                        <Button btnType = 'Success' clicked = {this.props.purchaseContinued}>CONTINUE</Button>
                    </Aux_>
            );
        }
}


export default OrderSummary;