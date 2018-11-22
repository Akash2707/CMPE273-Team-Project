import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import JobApplication from './JobApplication/jobApplication';
import DisplayJobDetail from './Job/displayJobDetail';
import SavedJobs from './Job/savedJobs';
import SearchJobDisplay from './Job/searchJobDisplay';
import Login from './Login/Login'
import Signup from './Signup/Signup'
import ViewProfileApplicant from './ViewProfileApplicant'
import ViewProfileRecruiter from './ViewProfileRecruiter'
import Navbar from './Navbar/Navbar'
import PostJobMain from './PostJob/PostJobMain';
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}


                <Route path="/jobapplication" component={JobApplication}/>
                <Route path="/jobdetail" component={DisplayJobDetail}/>
                <Route path="/savedjobs" component={SavedJobs}/>
                <Route path="/searchjobdisplay" component={SearchJobDisplay}/>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup}/>
                <Route path="/applicantHome" component={ViewProfileApplicant}/>
                <Route path="/recruiterHome" component={ViewProfileRecruiter}/>
                <Route path= "/" component = {Navbar}/>
                <Route path="/job-posting" component={PostJobMain}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;
