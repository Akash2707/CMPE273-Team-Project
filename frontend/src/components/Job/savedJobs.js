import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';

class SavedJobs extends Component {

    constructor(props) {

        super(props);

        this.state = {
        }
    }

    componentDidMount(){
        
    }
    render() {

        return (
            <div className="containerFluid" style={{ marginTop: "52px" }}>
                <div className="col-md-12 savedJobsBanner">
                    <h4 style={{ margin: "20px 0px 0px 20px" }}>Saved Jobs</h4>
                </div>
                <div className="col-md-12">
                    <div className="col-md-7 savedJobsBox">
                        <div className="col-md-12 savedJobsCards">
                            <div className="col-md-2 savedJobsLogo">

                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-7 savedJobsDetails">

                                <h5><b>Position</b></h5>
                                <h6>Company Name</h6>
                                <br />
                                <p>Location</p>
                            </div>
                            <div align="right" class="col-md-2">
                                <p><i class="glyphicon glyphicon-bookmark" style={{ fontSize: "30px", color: "blue", marginTop: "50%" }} ></i></p>

                            </div>

                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-4 appliedJobsBox">
                        <div className="col-md-12">
                            <h4 style={{ color: "#506B71" }}>Applied Jobs</h4>
                            <hr />
                        </div>
                        <div className="col-md-12 appliedJobDisplay">
                            <div className="col-md-12" style={{ margin: "0px", padding: "0px" }}>
                                <div className="col-md-1"></div>
                                <div className="col-md-2 appliedJobLogo">
                                </div>
                                <div className="col-md-1"></div>
                                <div className="col-md-8 appliedJobDetail">

                                    <h5>Position Name</h5>
                                    <label>Company Name</label>
                                    <p>Location </p>
                                </div>
                            </div>
                            <div className="col-md-12" style={{ margin: "0px", padding: "0px" }}>
                                <div className="col-md-3"></div>
                                <div className="col-md-9"><hr /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SavedJobs;