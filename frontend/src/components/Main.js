import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Login from './Login/Login'
import Signup from './Signup/Signup'
import ViewProfileApplicant from './ViewProfileApplicant'
import ViewProfileRecruiter from './ViewProfileRecruiter'
import Navbar from './Navbar/Navbar'


class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}


                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup}/>
                <Route path="/applicantHome" component={ViewProfileApplicant}/>
                <Route path="/recruiterHome" component={ViewProfileRecruiter}/>
                <Route path= "/" component = {Navbar}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;
