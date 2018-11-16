import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import ApplicantLogin from './Login/applicantLogin';

class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/applicantlogin" component={ApplicantLogin}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;