import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import ApplicantLogin from './Login/applicantLogin';
import JobApplication from './JobApplication/jobApplication';
import DisplayJobDetail from './Job/displayJobDetail';
import SavedJobs from './Job/savedJobs';
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/applicantlogin" component={ApplicantLogin}/>
                <Route path="/jobapplication" component={JobApplication}/>
                <Route path="/jobdetail" component={DisplayJobDetail}/>
                <Route path="/savedjobs" component={SavedJobs}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;