import React from 'react';
import {
    Switch,
    Route, BrowserRouter as Router,Link
} from "react-router-dom";
import EMW from './hoc/EMW/EMW'
import ListOfFarms from './components/farms/listOfFarms'
import EditFarm from "./components/farms/edit-item/edit-farm";
import CreateFarm from "./components/farms/edit-item/create-farm";
import ListOfPets from "./components/pets/list-of-pets";


function App() {

    return (
        <Router>
            <div>
                <Link to="/">Home</Link>{' '}
                <Link to={{pathname: '/create-farm'}}>Create Farm</Link>{' '}
                <Link to={{pathname: '/about'}}>About</Link>{' '}
                <Link to="/contact">Contact</Link>

                <Switch>
                    <Route path="/" exact render={() => <EMW> <ListOfFarms/> </EMW> }/>
                    <Route path="/about"
                           exact
                           render={() => <h1>About Us</h1>}/>
                    <Route
                        path="/contact"
                        exact
                        render={() => <h1>Contact Us</h1>} />
                    <Route
                        path="/edit-farm/:id"
                        exact
                        render={() => <EditFarm></EditFarm>}/>
                    <Route
                        path="/create-farm"
                        exact
                        render={() => <CreateFarm></CreateFarm>}/>

                    <Route
                        path="/farm-pets/:id"
                        exact
                        render={() => <ListOfPets></ListOfPets>}/>
                    <Route render={() => <h1>Page not found</h1>} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
