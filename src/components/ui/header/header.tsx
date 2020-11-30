import React, {Component} from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse
} from "mdbreact";
import {
    Switch,
    Route, BrowserRouter as Router
} from 'react-router-dom';

import EMW from '../../../hoc/EMW/EMW'
import ListOfFarms from '../../../components/farms/listOfFarms'
import EditFarm from "../../../components/farms/edit-item/edit-farm";
import CreateFarm from "../../../components/farms/edit-item/create-farm";
import ListOfPets from "../../../components/pets/list-of-pets";
import About from "../../../components/ui/About/About";
import ContactFormular from "../contact/contact";


class NavbarPage extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        return (

                <Router>
                    <MDBNavbar color="default-color" dark expand="md">
                        <MDBNavbarBrand>
                            <strong className="white-text">Pet farming app</strong>
                        </MDBNavbarBrand>
                        <MDBNavbarToggler onClick={this.toggleCollapse}/>
                        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                            <MDBNavbarNav left>
                                <MDBNavItem active>
                                    <MDBNavLink to="/">Home</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="/create-farm">Create Farm</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="/about">About</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="/contact">Contact me</MDBNavLink>
                                </MDBNavItem>
                            </MDBNavbarNav>
                        </MDBCollapse>
                    </MDBNavbar>

                    <Switch>
                        <Route path="/" exact render={() => <EMW> <ListOfFarms/> </EMW>}/>
                        <Route path="/about"
                               exact
                               render={() => <About/>}/>
                        <Route
                            path="/contact"
                            exact
                            render={() => <ContactFormular/>}/>
                        <Route
                            path="/edit-farm/:id"
                            exact
                            render={() => <EditFarm/>}/>
                        <Route
                            path="/create-farm"
                            exact
                            render={() => <CreateFarm/>}/>

                        <Route
                            path="/farm-pets/:id"
                            exact
                            render={() => <ListOfPets/>}/>


                        <Route render={() => <h1>Page not found</h1>}/>


                    </Switch>

                </Router>
        );
    }
}

export default NavbarPage;
