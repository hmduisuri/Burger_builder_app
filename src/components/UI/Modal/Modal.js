import React from "react";
import classes from "./Modal.css"
import Aux_ from "../../../hoc/Aux_";
import Backdrop from "../Backdrop/Backdrop";


const model = (props) => (

    <Aux_> 
        <Backdrop show = {props.show} clicked = {props.modelClosed}/>
        <div className = {classes.Modal}
    style = {{
        transform : props.show ? 'translateY(0)' : 'translateY(100vh)',
        opacity : props.show  ? '1' : '0'
        
    }}
    >
        {props.children}
    </div>   
    </Aux_>
   
);

export default model;