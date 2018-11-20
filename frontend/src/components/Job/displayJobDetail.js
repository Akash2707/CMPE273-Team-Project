import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';

class DisplayJobDetail extends Component {

    constructor(props) {

        super(props);

        this.state = {
            email:"",
            phone:"",
            resume:"",
            firstName:"",
            lastName:""
        }
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.fnameChangeHandler = this.fnameChangeHandler.bind(this);
        this.lnameChangeHandler = this.lnameChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);

    }
    fnameChangeHandler = (e) => {
        this.setState({
            fName:e.target.value
          });
    }
    lnameChangeHandler = (e) => {
       
        this.setState({
            lName:e.target.value
          });
    }

    emailChangeHandler = (e) => {
       
        this.setState({
            email:e.target.value
          });
          
    }
    phoneChangeHandler = (e) => {
       
        this.setState({
            phone:e.target.value
          });
    }
    render() {
        return (
            <div className="col-md-12" style={{  padding: "0px 0px 80px 0px" }}>

                <div className="col-md-12 " style={{ padding: "0px" }}>
                <div className="detailJobBox" style={{ padding: "0px" }}>
                    <div className="col-md-12 detailJobBanner" style={{ backgroundImage: "url(http://svgur.com/i/66g.svg)", backgroundRepeat: "repeat-x" }}>
                        <img src="http://svgur.com/i/66g.svg" />
                    </div>
                    <div className="col-md-12 detailJobDiv">
                        <div className="col-md-3 detailJobLogo">
                        </div>

                        <div className="col-md-9 detailJobCompanyDetail">
                            <h4>Company name </h4>
                            <p>Company location</p>
                            <p>Posted date</p>
                        </div>
                        <div className="col-md-2" style={{ margin: "0px", padding: "0px" }}>
                            <button type="button" class="btn btn-outline-secondary btn-lg" style={{ marginTop: "20px", border: "1px solid #B8BDBE" }}>Save</button>
                        </div>
                        <div className="col-md-2" style={{ margin: "0px", padding: "0px" }}>
                            <button type="button" class="btn btn-primary btn-lg " style={{ marginTop: "20px" }} data-toggle="modal" data-target="#easyApply">Easy Apply</button>
                        </div>

                         <div class="modal fade" id="easyApply" role="dialog">
                            <div class="modal-dialog">
                            
                            <div class="modal-content">
                                <div class="modal-header" style={{backgroundColor: "#0888B8"}}>
                                <h4 class="modal-title" style={{color:"#ffffff"}}>Easy Apply</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                               
                                </div>
                                <div class="modal-body">
                                    <form name="easyApplyForm" > 
                                    <div className="col-md-12 form-group">
                                        <label>First Name</label> 
                                        <input type="text" className="form-control" name="fName" placeholder="First Name" onChange={this.fnameChangeHandler} defaultValue={this.state.fName}  required/>
                                    </div>
                               
                                    <div className="col-md-12 form-group">
                                        <label>Last Name</label> 
                                        <input type="text" className="form-control" name="lName" placeholder="Last Name" onChange={this.lnameChangeHandler} defaultValue={this.state.lName} required />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <label>Email</label> 
                                        <input type="email" className="form-control" name="email" placeholder="Email" onChange={this.emailChangeHandler} defaultValue={this.state.email}  required/>
                                    </div>
                               
                                    <div className="col-md-12 form-group">
                                        <label>Phone</label> 
                                        <input type="text" className="form-control" name="phone" placeholder="Phone" onChange={this.phoneChangeHandler} defaultValue={this.state.phone}  required/>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <label>Resume</label> 
                                        <input type="file" className="form-control" name="resume"  accept="resume/pdf, resume/doc "placeholder="Resume"/>
                                    </div>
                                    
                               
                                <div class="modal-footer">
                                <input class="btn btn-primary btn-lg" type="submit" value="Submit"/>
                                <button type="button" class="btn btn-default" data-dismiss="modal" style={{border:"1px solid #B8BDBE"}}>Close</button>
                                </div>
                             </form> 
                             </div>  
                            </div>
                            
                            </div>
                        </div>

                    </div>

                </div>
                </div>
                <div className="col-md-12 detailJobDiv1">
                    <div className="col-md-12 ">
                        <div className="col-md-7" >
                            <h3 style={{ color: "#5A6666" }}>Job Description</h3>
                            <h5 style={{ margin: "10px", fontWeight: "100" }}>About Role</h5>
                            <p>"Description"</p>
                        </div>
                        <div className="col-md-5">
                            <label>Industry:</label>
                            <p>"Answer"</p>

                            <label>Employment Type:</label>
                            <p>"Answer"</p>

                            <label>Seniority Level</label>
                            <p>"Answer"</p>

                             <label>Position</label>
                            <p>"Answer"</p>

                            <label>Job Function</label>
                            <p>"Answer"</p>

                             <label>Level of Education</label>
                            <p>"Answer"</p>
                        </div>
                    </div>
                   
                    <div className="col-md-12 ">
                    <br/>
                    <hr/>
                        <h5 style={{ margin: "10px", fontWeight: "500" }}>Skills</h5>
                        <div className="col-md-3 chip">
                            skills
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default DisplayJobDetail;