import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button"
import axios from "../../../axios-orders";

import classes from "./ContactData.css"
import Spinner from "../../../components/UI/Spinner/Spinner";
// import { withRouter } from "react-router";

class ContactData extends Component {
    state = {
        name:'',
        email:'',
        address: {
            street:'',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
         this.setState({loading: true});
        //end url
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
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
        axios.post('/orders.json',order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false});
        });
      
    }

    render () {
        let form = (
            <form>
                    <input type = "text" name = "name" placeholder = "Your Name"/>
                    <input type = "text" name = "email" placeholder = "Your Mail"/>
                    <input type = "text" name = "street" placeholder = "Street"/>
                    <input type = "text" name = "postalcode" placeholder = "Postal Code"/>
                    <Button btnType = 'Success' clicked = {this.orderHandler}>ORDER</Button> 
            </form>
        );

        if(this.state.loading){
            form = <Spinner/>
        }
        return (
            <div className = {classes.ContactData}>
                <h4>Enter your contact details</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;