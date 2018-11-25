import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router';
import { connect } from "react-redux";



class ApplicantEducation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companyName: props.getValues().companyName,
            positionExperience: props.getValues().positionExperience,
            school: props.getValues().school,
            degree: props.getValues().degree,
            discipline: props.getValues().discipline,

        }
        this.companynameChangeHandler = this.companynameChangeHandler.bind(this);
        this.positionExperienceHandler = this.positionExperienceHandler.bind(this);
        this.schoolChangeHandler = this.schoolChangeHandler.bind(this);
        this.degreeChangeHandler = this.degreeChangeHandler.bind(this);
        this.disciplineChangeHandler = this.disciplineChangeHandler.bind(this);
    }
    companynameChangeHandler = (e) => {
        this.props.updateValues({
            ...{companyName:e.target.value}
          });
    }
    positionExperienceHandler = (e) => {
       
        this.props.updateValues({
            ...{positionExperience:e.target.value}
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
   

    render() {
        return(
            <div className="container" style={{ background: "#ffffff", display: "flex", justifyContent: "center" }}>
                <div className="col-md-12 jobApplyBox">
                    <div className="col-md-12">
                        <h2 style={{ color: "#000000", textAlign: "center", margin: "5px" }}>Job Application <span style={{color: "blue"}}>{this.props.getValues().jobCompanyName}</span></h2>
                        <hr />
                    </div>
                    <div className="col-md-12">
                        <h6>Education </h6>
                    </div>
                      <div className="col-md-12">
                        <div className="col-md-12 form-group">
                            <label>School</label> 
                            <input type="text" className="form-control" name="school" placeholder="School" onChange={this.schoolChangeHandler} defaultValue={this.state.school}  />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="col-md-6 form-group">
                            <label>Degree</label> 
                            <input type="text" className="form-control" name="degree" placeholder="Degree" onChange={this.degreeChangeHandler} defaultValue={this.state.degree}  />
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Discipline</label> 
                            <input type="text" className="form-control" name="discipline" placeholder="Discipline" onChange={this.disciplineChangeHandler} defaultValue={this.state.discipline}  />
                        </div>
                    </div>
                   
                    <div className="col-md-12">
                    <br/>
                        <h6>Work Experience </h6>
                    </div>
                    
                    <div className="col-md-12">
                        <div className="col-md-6 form-group">
                            <label>Company Name</label> 
                            <input type="text" className="form-control" name="companyName" placeholder="Company Name" onChange={this.companynameChangeHandler} defaultValue={this.state.companyName}  />
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Position</label> 
                            <input type="text" className="form-control" name="positionExperience" placeholder="Position" onChange={this.positionExperienceHandler} defaultValue={this.state.positionExperience}  />
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

  
export default ApplicantEducation;