import React, { Component } from "react";
import Aux_ from "../../hoc/Aux_/Aux_";
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummery from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

const INGREDIENTS_PRICES = {
    salad: 10,
    cheese: 30,
    meat: 50,
    bacon: 70
}

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            meat:0,
            bacon: 0
        },
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    updatePurchaseState (ingrediants) {
        const sum = Object.keys(ingrediants)
        .map(igKey => {
            return ingrediants[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0 );
        this.setState({purchasable: sum > 0});
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing : true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }
    purchaseContinueHandler = () => {
        // alert("You are continue!");
        this.setState({loading: true});
        //end url
        const order = {
            ingrediants: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Upeksha Isuri',
                address:{
                    street: 'Shikahama',
                    zipcode: '123-0864',
                    country: 'Sri Lanka'
                },
                email: 'hmduisuri@gmail.com',
            },
            deliveryMethod: 'fastest',
            dateTime: new Date()

        }
        axios.post('/orders',order)
        .then(response => {
            this.setState({loading: false , purchasing: false});
        })
        .catch(error => {
            this.setState({loading: false , purchasing: false});
        });
    }

render(){
    const disabledInfo = {
        ...this.state.ingredients
    };
    for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummery = <OrderSummery 
    ingredients = {this.state.ingredients} 
    purchaseContinued = {this.purchaseContinueHandler} 
    purchaseCanceled = {this.purchaseCancelHandler}
    price = {this.state.totalPrice} />

    if(this.state.loading) {
        orderSummery = <Spinner/>
    }

    return(
        <Aux_>
            <Modal show = {this.state.purchasing} modelClosed = {this.purchaseCancelHandler}>
              {orderSummery}
            </Modal>
            <Burger ingredients = {this.state.ingredients}/>
            <BuildControls 
            ingredientAdded = {this.addIngredientHandler}
            ingredientRemove = {this.removeIngredientHandler}
            disabled = {disabledInfo}
            purchasable = {this.state.purchasable}
            price = {this.state.totalPrice}
            ordered = {this.purchaseHandler}/>
        </Aux_>
    );
}

}

export default  withErrorHandler(BurgerBuilder, axios)