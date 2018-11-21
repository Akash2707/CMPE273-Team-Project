import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import ApplicantLogin from './Login/applicantLogin';
import PostJobMain from './PostJob/PostJobMain';

class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/applicantlogin" component={ApplicantLogin}/>
                <Route path="/job-posting" component={PostJobMain}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;