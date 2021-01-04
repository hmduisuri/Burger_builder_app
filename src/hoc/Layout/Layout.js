import  React, {Component}  from "react";
import  Aux from "../Aux_/Aux_";
import  classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component{

    state = {
        showSideDrawer : true
    }

    SideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});

    }

    sideDrawerTrogleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render () {
       return(
          <Aux>
        <Toolbar drawerTroggleClicked = {this.sideDrawerTrogleHandler}/>
        <SideDrawer open = {this.state.showSideDrawer} closed = {this.SideDrawerClosedHandler}/>
        <main className = {classes.Content}>
        {this.props.children}
        </main>
    </Aux>  
       ) 
    }
}

export default Layout;