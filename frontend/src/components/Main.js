import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import ApplicantLogin from './Login/applicantLogin';
import Profile from './Profile/profile'
import ViewProfile from './ViewProfile/viewProfile'
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/profile" component={Profile}/>
                <Route path="/viewprofile" component = {ViewProfile}/>
                <Route path="/applicantlogin" component={ApplicantLogin}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;