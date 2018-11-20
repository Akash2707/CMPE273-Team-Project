import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router';
import { connect } from "react-redux";



class EqualOpportunity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gender: props.getValues().gender,
            disability: props.getValues().disability,
            veteran: props.getValues().verteran,
            race: props.getValues().race,
        }
        this.genderHandler = this.genderHandler.bind(this);
        this.disabilityHandler = this.disabilityHandler.bind(this);
        this.veteranHandler = this.veteranHandler.bind(this);
        this.raceHandler = this.raceHandler.bind(this);
    }
    genderHandler = (e) => {
        this.props.updateValues({
            ...{gender:e.target.value}
          });
    }
    disabilityHandler = (e) => {
       
        this.props.updateValues({
            ...{disability:e.target.value}
          });
    }

    veteranHandler = (e) => {
       
        this.props.updateValues({
            ...{veteran:e.target.value}
          });
    }
    raceHandler = (e) => {
       
        this.props.updateValues({
            ...{race:e.target.value}
          });
    }
   
    render() {
        return(
            <div className="container" style={{ background: "#ffffff", display: "flex", justifyContent: "center" }}>
                <div className="col-md-12 jobApplyBox">
                    <div className="col-md-12">
                        <h2 style={{ color: "#000000", textAlign: "center", margin: "5px" }}>Job Application</h2>
                        <hr />
                    </div>
                    <div className="col-md-12">
                        <div className="col-md-6 form-group">
                            <h5 className="bold">Gender</h5>
                        </div>
                    </div>
                        <div className="col-md-12 form-group" style={{margin:'10px'}}>
                            <label>
                            <input type="radio" name="gender" value="male" onChange={this.genderHandler} />
                            &nbsp; Male
                            </label>
                            <br/>
                            <label>
                            <input type="radio" name="gender" value="female" onChange={this.genderHandler} />
                            &nbsp; Female
                            </label>
                            <br/>
                            <label>
                            <input type="radio" name="gender" value="notDeclared" onChange={this.genderHandler} />
                            &nbsp;   Choose Not to Declare
                            </label> 
                            <hr/>
                        </div>
                        
                        <div className="col-md-12 form-group">
                        
                            <h5 className="bold">Are you Hispanic or Latino</h5>
                        </div>
                    <div className="col-md-12" style={{margin:'10px'}}>
                        
                            <label>
                            <input type="radio" name="race" value="yes" onChange={this.raceHandler} />
                            &nbsp;   Yes
                            </label>
                            <br/>
                            <label>
                            <input type="radio" name="race" value="no" onChange={this.raceHandler} />
                            &nbsp;  No
                            </label>
                            <br/>
                            <label>
                            <input type="radio" name="race" value="notDeclared" onChange={this.raceHandler} />
                            &nbsp;  Choose Not to Declare
                            </label> 
                            <hr/>
                    </div>
                    
                    <div className="col-md-12 form-group">
                            <h5 className="bold">Veteran Status</h5>
                    </div>
                    <div className="col-md-12" style={{margin:'10px'}}>
                        
                            <label>
                            <input type="radio" name="veteran" value="yes" onChange={this.veteranHandler} />
                            &nbsp;   I am protected veteran
                            </label>
                            <br/>
                            <label>
                            <input type="radio" name="veteran" value="no" onChange={this.veteranHandler} />
                            &nbsp; I am NOT protected veteran
                            </label>
                            <br/>
                            <label>
                            <input type="radio" name="veteran" value="notDeclared" onChange={this.raceHandler} />
                            &nbsp;  Choose Not to Declare
                            </label> 
                            <hr/>
                    </div>
                    
                    <div className="col-md-12 form-group">
                            <h5 className="bold">Do you have or had disability</h5>
                    </div>
                    <div className="col-md-12" style={{margin:'10px'}}>
                        
                            <label>
                            <input type="radio" name="disability" value="yes" onChange={this.disabilityHandler} />
                            &nbsp;   Yes
                            </label>
                            <br/>
                            <label>
                            <input type="radio" name="disability" value="no" onChange={this.disabilityHandler} />
                            &nbsp;   No
                            </label>
                            <br/>
                            <label>
                            <input type="radio" name="disability" value="notDeclared" onChange={this.disabilityHandler} />
                            &nbsp;    Choose Not to Declare
                            </label> 
                            
                    </div>
                    
                </div>
            </div>
        )
    }
}
  
export default EqualOpportunity;