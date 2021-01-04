import React, { Component } from "react";
import classes from "./Modal.css"
import Aux_ from "../../../hoc/Aux_";
import Backdrop from "../Backdrop/Backdrop";


class Model extends Component {
    //this could be a functional component, dosn't have to be a class
    shouldComponentUpdate (nextProps, nextState){
        return nextProps.show !== this.props.show; //if(nPr !== pr.show) return true
    }
render () {
    return (
 <Aux_> 
        <Backdrop show = {this.props.show} clicked = {this.props.modelClosed}/>
        <div className = {classes.Modal}
    style = {{
        transform : this.props.show ? 'translateY(0)' : 'translateY(100vh)',
        opacity : this.props.show  ? '1' : '0'
        
    }}
    >
        {this.props.children}
    </div>   
    </Aux_>
    );
}
}

export default Model;