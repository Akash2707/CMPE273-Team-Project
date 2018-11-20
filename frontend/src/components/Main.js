import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import ApplicantLogin from './Login/applicantLogin';
import Navbar from './Navbar/Navbar'

class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path= "/" component = {Navbar}/>
                <Route path="/applicantlogin" component={ApplicantLogin}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;