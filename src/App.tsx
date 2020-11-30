import React from 'react';
import EMW from './hoc/EMW/EMW'
import NavbarPage from './components/ui/header/header';
import withErrorHandler from './hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';


function App() {

    return (
        <EMW>
            <NavbarPage></NavbarPage>
        </EMW>
    );
}

export default withErrorHandler(App,axios);
