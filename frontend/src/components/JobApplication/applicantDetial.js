import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router';
import { connect } from "react-redux";

class ApplicantDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fName: props.getValues().fName,
            lName: props.getValues().lName,
            email: props.getValues().email,
            phone: props.getValues().phone,
            location: props.getValues().location,
            sponorship: props.getValues().sponorship,
            hearAboutUs: props.getValues().hearAboutUs,
            linkedInUrl: props.getValues().linkedInUrl,
            gitWebUrl: props.getValues().gitWebUrl,
            resume: this.props.getValues().resume

        }
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.fnameChangeHandler = this.fnameChangeHandler.bind(this);
        this.lnameChangeHandler = this.lnameChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
        this.locationChangeHandler = this.locationChangeHandler.bind(this);
        this.sponorshipChangeHandler = this.sponorshipChangeHandler.bind(this);
        this.hearAboutUsHandler = this.hearAboutUsHandler.bind(this);
        this.linkedinurlHandler = this.linkedinurlHandler.bind(this);
        this.gitweburlHandler = this.gitweburlHandler.bind(this);
        this.resumeHandler = this.resumeHandler.bind(this);
        
    }
    fnameChangeHandler = (e) => {
        this.props.updateValues({
            ...{fName:e.target.value}
          });
    }
    lnameChangeHandler = (e) => {
       
        this.props.updateValues({
            ...{lName:e.target.value}
          });
    }

    emailChangeHandler = (e) => {
       
        this.props.updateValues({
            ...{email:e.target.value}
          });
          
    }
    phoneChangeHandler = (e) => {
       
        this.props.updateValues({
            ...{phone:e.target.value}
          });
    }
    locationChangeHandler = (e) => {
       
        this.props.updateValues({
            ...{location:e.target.value}
          });
    }
    schoolChangeHandler = (e) => {
       
        this.props.updateValues({
            ...{school:e.target.value}
          });
    }
    degreeChangeHandler = (e) => {
      
        this.props.updateValues({
            ...{degree:e.target.value}
          });
    }
    disciplineChangeHandler = (e) => {
       
        this.props.updateValues({
            ...{discipline:e.target.value}
          });
    }
    sponorshipChangeHandler = (e) => {
       
        this.props.updateValues({
            ...{sponorship:e.target.value}
          });
    }
    hearAboutUsHandler = (e) => {
       
        this.props.updateValues({
            ...{hearAboutUs:e.target.value}
          });
    }
    linkedinurlHandler = (e) => {
      
        this.props.updateValues({
            ...{linkedInUrl:e.target.value}
          });
    }
    gitweburlHandler = (e) => {
       
        this.props.updateValues({
            ...{gitWebUrl:e.target.value}
          });
    }
    resumeHandler = (e) => {
        this.props.updateValues({
            ...{resume:  e.target.files[0]}
          });
    }
   

    render() {
        return(
            <div className="container" style={{ background: "#ffffff", display: "flex", justifyContent: "center" }}>
                <div className="col-md-12 jobApplyBox">
                    <div className="col-md-12">
                        <h2 style={{ color: "#000000", textAlign: "center", margin: "5px" }}>Job Application for <span style={{color: "blue"}}>{this.props.getValues().jobCompanyName}</span></h2>
                        <hr />
                    </div>
                    
                    <div className="col-md-12">
                        <div className="col-md-6 form-group">
                            <label>First Name</label> 
                            <input type="text" className="form-control" name="fName" placeholder="First Name" onChange={this.fnameChangeHandler} defaultValue={this.state.fName}  />
                            
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Last Name</label> 
                            <input type="text" className="form-control" name="lName" placeholder="Last Name" onChange={this.lnameChangeHandler} defaultValue={this.state.lName}  />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="col-md-12 form-group">
                            <label>Email</label> 
                            <input type="email" className="form-control" name="email" placeholder="Email" onChange={this.emailChangeHandler} defaultValue={this.state.email}  />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="col-md-6 form-group">
                            <label>Phone</label> 
                            <input type="text" className="form-control" name="phone" placeholder="Phone" onChange={this.phoneChangeHandler} defaultValue={this.state.phone}  />
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Location</label> 
                            <input type="text" className="form-control" name="location" placeholder="Location" onChange={this.locationChangeHandler} defaultValue={this.state.location}  />
                        </div>
                    </div>
                    
                    <div className="col-md-12">
                        <div className="col-md-6 form-group">
                            <label>Resume</label> 
                            <input type="file" className="form-control" name="resume"  accept="resume/pdf, resume/doc "placeholder="Resume"  onChange={this.resumeHandler}/>
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Cover Letter</label> 
                            <input type="file" className="form-control" name="coverLetter" placeholder="Cover Letter"  />
                        </div>
                    </div>
                    
                    <div className="col-md-12">
                        <div className="col-md-12 form-group">
                            <label>Are you authorized to work legally in the United States. If you require sponorship.Please Indicate Type.</label> 
                            <input type="text" className="form-control" name="sponorship" placeholder="" onChange={this.sponorshipChangeHandler} defaultValue={this.state.sponorship}  />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="col-md-6 form-group">
                            <label>How did you hear about us</label> 
                            <div class="FormSelect__wrapper">
                                <select aria-label="Choose" name="hearAboutUs" class="form-control FormSelect__select" onChange={this.hearAboutUsHandler} defaultValue={this.state.hearAboutUs}>
                                <option value="noSelection">Choose</option>
                                <option value="referral">Employee Referral</option>
                                <option value="jobboard">Job Board</option>
                                <option value="website">Company Website</option>
                                <option value="social">Social Network</option>
                                <option value="fair">Job Fair</option>
                                <option value="other">Other</option>
                                </select>
                                <i aria-hidden="true" class="icon-chevron-down FormSelect__chevron"></i>
                           </div>
                        
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="col-md-12 form-group">
                            <label>LinkedIn Profile URL</label> 
                            <input type="text" className="form-control" name="linkedInUrl" placeholder="" onChange={this.linkedinurlHandler} defaultValue={this.state.linkedInUrl}  />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="col-md-12 form-group">
                            <label>Github/Website Profile URL</label> 
                            <input type="text" className="form-control" name="gitWebUrl" placeholder="" onChange={this.gitweburlHandler} defaultValue={this.state.gitWebUrl}  />
                        </div>
                    </div>
                   
                </div>
            </div>
        )
    }
}

    
export default ApplicantDetail;