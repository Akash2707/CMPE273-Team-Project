import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';

class DisplayJobDetail extends Component {

    constructor(props) {

        super(props);

        this.state = {
            email: localStorage.getItem("email"),
            phone: "",
            resume: null,
            fName: localStorage.getItem("name").split(" ")[0],
            lName: localStorage.getItem("name").split(" ")[1],
            job: {},
            applied: false,
            isAlreadySaved: false
        }
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.fnameChangeHandler = this.fnameChangeHandler.bind(this);
        this.lnameChangeHandler = this.lnameChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
        this.resumeHandler = this.resumeHandler.bind(this);
    }
    fnameChangeHandler = (e) => {
        this.setState({
            fName: e.target.value
        });
    }
    lnameChangeHandler = (e) => {

        this.setState({
            lName: e.target.value
        });
    }

    emailChangeHandler = (e) => {

        this.setState({
            email: e.target.value
        });

    }
    phoneChangeHandler = (e) => {

        this.setState({
            phone: e.target.value
        });
    }

    resumeHandler = (e) => {

        console.log(e.target.files)

        this.setState({
            resume: e.target.files[0],
        });
    }

    handleEasyApply = () => {
        console.log(this.state)
        let data = new FormData()
        data.append("jobId", this.state.job._id)
        data.append("jobCompanyName", this.state.job.companyName)
        data.append("jobCompanyLogo", this.state.job.companyLogo)
        data.append("jobLocation", this.state.job.city)
        data.append("jobTitle", this.state.job.title)
        data.append("fName", this.state.fName)
        data.append("lName", this.state.lName)
        data.append("email", this.state.email)
        data.append("phone", this.state.phone)
        data.append("resume", this.state.resume)
        data.append("companyName", this.state.job.companyName)
        data.append("address", localStorage.getItem('state'))
        console.log(data)

        this.props.submitApplication(data)
    }

    handleSaveJob = () => {
        console.log(this.state)
        let data = {}
        data = {
            "userId": localStorage.getItem("email"),
            "recruiterId": this.state.job.recruiterEmail,
            "jobId": this.state.job._id,
            "companyName": this.state.job.companyName,
            "companyLogo": this.state.job.companyLogo,
            "location": this.state.job.city,
            "title": this.state.job.title,
            "postedDate": this.state.job.created_at
        }
        console.log(data)

        this.props.submitSaveJob(data)
    }

    handleApplyClick = () => {
        let applyPage = null
        applyPage = this.props.history.push({
            pathname: "/jobapplication",
            state: {
                jobId: this.state.job._id,
                companyName: this.state.job.companyName,
                companyLogo: this.state.job.companyLogo,
                city: this.state.job.city,
                title: this.state.job.title,
                recruiterId: this.state.job.recruiterEmail,
            }
        })
    }

    componentDidMount() {
        try {
            let applied = false
            if (this.props.location.state.job.allowEasyApply == true) {
                axios.defaults.withCredentials = true;
                //make a post request with the user data

                axios.get('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/check/easyapply', {
                    headers: { Authorization: localStorage.getItem('token') },
                    params: {
                        email: localStorage.getItem('email'),
                        jobId: this.props.location.state.job._id,
                    }
                })
                    .then(response => {
                        applied = response.data.applied
                        console.log("Status Code : ", response);
                        this.setState({
                            job: this.props.location.state.job,
                            applied: applied,
                            isAlreadySaved: isSaved
                        })
                    })
                    .catch(error => {
                        console.log("Error : ", error);
                        this.setState({
                            job: this.props.location.state.job,
                            applied: applied,
                            isAlreadySaved: isSaved
                        })
                    });
            } else {
                axios.defaults.withCredentials = true;
                //make a post request with the user data
                axios.get('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/check/application', {
                    headers: { Authorization: localStorage.getItem('token') },
                    params: {
                        email: localStorage.getItem('email'),
                        jobId: this.props.location.state.job._id,
                    }
                })
                    .then(response => {
                        applied = response.data.applied
                        console.log("Status Code : ", response);
                        this.setState({
                            job: this.props.location.state.job,
                            applied: applied,
                            isAlreadySaved: isSaved
                        })
                    })
                    .catch(error => {
                        console.log("Error : ", error);
                        this.setState({
                            job: this.props.location.state.job,
                            applied: applied,
                            isAlreadySaved: isSaved
                        })
                    });
            }
            let isSaved = false
            axios.defaults.withCredentials = true;
            //make a post request with the user data

            axios.get('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/check/savedJobs', {
                headers: { Authorization: localStorage.getItem('token') },
                params: {
                    email: localStorage.getItem('email'),
                    jobId: this.props.location.state.job._id,
                }
            })
                .then(response => {
                    isSaved = response.data.saved
                    console.log("Status Code : ", response);
                    this.setState({
                        isAlreadySaved: isSaved
                    })
                })
                .catch(error => {
                    console.log("Error : ", error);
                });

            axios.defaults.withCredentials = true;
            //make a post request with the user data


            const jobViewCount = {
                email: localStorage.getItem('email'),
                jobId: this.props.location.state.job._id,
            }
            axios.post('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/updatejobCount', jobViewCount, {
                headers: { Authorization: localStorage.getItem('token') },
            })
                .then(response => {
                    console.log("Status Code : ", response);
                })
                .catch(error => {
                    console.log("Error : ", error);
                });

        } catch (e) {
            this.setState({
                job: {},
                applied: false
            })
        }

    }

    componentWillReceiveProps() {
        console.log(this.props.jobApplied)

    }

    render() {
        let page = null;
        let redirectVar = null;
        if (!localStorage.getItem('email')) {
            redirectVar = <Redirect to="/login" />
        }

        if (this.props.jobApplied) {

            page = this.props.history.push({
                pathname: "/savedjobs",
                state: {
                }
            })
        }

        if (this.props.jobSaved) {

            page = this.props.history.push({
                pathname: "/savedjobs",
                state: {
                }
            })
        }

        let apply = (
            <div className="col-md-2" style={{ margin: "0px", padding: "0px" }}>
                <button type="button" class="btn btn-primary btn-lg " style={{ marginTop: "20px" }} onClick={this.handleApplyClick}>Apply</button>
            </div>
        )
        if (this.state.job.allowEasyApply == true) {
            apply = (
                <div className="col-md-2" style={{ margin: "0px", padding: "0px" }}>
                    <button type="button" class="btn btn-primary btn-lg " style={{ marginTop: "20px" }} data-toggle="modal" data-target="#easyApply">Easy Apply</button>
                </div>
            )
        }

        if (this.state.applied == true) {
            apply = (
                <div className="col-md-2" style={{ margin: "0px", padding: "0px" }}>
                    <button type="button" class="btn btn-primary btn-lg " style={{ marginTop: "20px" }} >Already Applied</button>
                </div>
            )
        }

        let save = (
            <div className="col-md-2" style={{ margin: "0px", padding: "0px" }}>
                <button type="button" class="btn btn-outline-secondary btn-lg" style={{ marginTop: "20px", border: "1px solid #B8BDBE" }} onClick={this.handleSaveJob}>Save</button>
            </div>
        )

        if (this.state.isAlreadySaved == true) {
            save = (
                <div className="col-md-2" style={{ margin: "0px", padding: "0px" }}>
                    <button type="button" class="btn btn-primary btn-lg " style={{ marginTop: "20px" }} >Already Saved</button>
                </div>
            )
        }

        let skills = null
        if (this.state.job.skills) {
            let skillsDetail = this.state.job.skills.split(',');
            skills = skillsDetail.map(skill => {
                return (
                    <div className="col-md-3 chip">
                        {skill}
                    </div>
                )
            })
        }
        return (
            <div className="col-md-12" style={{ padding: "0px 0px 80px 0px" }}>
                {redirectVar}
                <div className="col-md-12 " style={{ padding: "0px" }}>
                    <div className="detailJobBox" style={{ padding: "0px" }}>
                        <div className="col-md-12 detailJobBanner" style={{ backgroundImage: "url(http://svgur.com/i/66g.svg)", backgroundRepeat: "repeat-x" }}>
                            <img src="http://svgur.com/i/66g.svg" />
                        </div>
                        <div className="col-md-12 detailJobDiv">
                            <div className="col-md-3 detailJobLogo">
                                <img src={this.state.job.companyLogo} height="160px" width="180px"></img>
                            </div>

                            <div className="col-md-9 detailJobCompanyDetail">
                                <h4>{this.state.job.companyName} </h4>
                                <p>{this.state.job.city}</p>
                                <p>{this.state.job.created_at}</p>
                            </div>
                            {save}
                            <div className="col-md-2"></div>
                            {apply}

                            <div class="modal fade" id="easyApply" role="dialog">
                                <div class="modal-dialog">

                                    <div class="modal-content">
                                        <div class="modal-header" style={{ backgroundColor: "#0888B8" }}>
                                            <h4 class="modal-title" style={{ color: "#ffffff" }}>Easy Apply</h4>
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>

                                        </div>
                                        <div class="modal-body">
                                            <form name="easyApplyForm" >
                                                <div className="col-md-12 form-group">
                                                    <label>First Name</label>
                                                    <input type="text" className="form-control" name="fName" placeholder="First Name" onChange={this.fnameChangeHandler} defaultValue={this.state.fName} required />
                                                </div>

                                                <div className="col-md-12 form-group">
                                                    <label>Last Name</label>
                                                    <input type="text" className="form-control" name="lName" placeholder="Last Name" onChange={this.lnameChangeHandler} defaultValue={this.state.lName} required />
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <label>Email</label>
                                                    <input type="email" className="form-control" name="email" placeholder="Email" onChange={this.emailChangeHandler} defaultValue={this.state.email} required />
                                                </div>

                                                <div className="col-md-12 form-group">
                                                    <label>Phone</label>
                                                    <input type="text" className="form-control" name="phone" placeholder="Phone" onChange={this.phoneChangeHandler} defaultValue={this.state.phone} required />
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <label>Resume</label>
                                                    <input type="file" className="form-control" name="resume" accept=".pdf" placeholder="Resume" onChange={this.resumeHandler} />
                                                </div>


                                                <div class="modal-footer">
                                                    <button class="btn btn-primary btn-lg" type="button" data-dismiss="modal" onClick={this.handleEasyApply} >Submit</button>
                                                    <button type="button" class="btn-danger btn-lg" data-dismiss="modal" style={{ border: "1px solid #B8BDBE" }}>Close</button>
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
                            <h5 style={{ margin: "10px", fontWeight: "100" }}>{this.state.job.title}</h5>
                            <p>{this.state.job.description}</p>
                        </div>
                        <div className="col-md-5">
                            <label><b>Industry:</b></label>
                            <p>{this.state.job.industry}</p>

                            <label><b>Employment Type:</b></label>
                            <p>{this.state.job.employmentType}</p>

                            <label><b>Seniority Level</b></label>
                            <p>{this.state.job.seniority}</p>

                            <label><b>Job Function</b></label>
                            <p>{this.state.job.jobFunction}</p>

                            <label><b>Level of Education</b></label>
                            <p>{this.state.job.education}</p>
                        </div>
                    </div>

                    <div className="col-md-12 ">
                        <br />
                        <hr />
                        <h5 style={{ margin: "10px", fontWeight: "500" }}>Skills</h5>
                        {skills}
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        easyApplyForm: state.jobApplyReducer.easyApplyForm,
        jobApplied: state.jobApplyReducer.jobApplied,
        jobSaved: state.jobApplyReducer.jobSaved,
    }
}

const mapDispatchStateToProps = dispatch => {
    return {
        submitApplication: (values) => {
            console.log(values)
            axios.defaults.withCredentials = true;
            axios.post('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/easyapply', values, {
                headers: { Authorization: localStorage.getItem('token') },
                params: {
                    email: localStorage.getItem("email")
                }
            })
                .then(response => {
                    console.log(response)
                    dispatch({ type: 'EASYAPPLY', payload: response, statusCode: response.status })
                })
                .catch(error => {
                    dispatch({ type: 'EASYAPPLY', payload: error.response.data, statusCode: error.response.status })
                });
        },
        submitSaveJob: (values) => {
            console.log(values)
            axios.defaults.withCredentials = true;
            axios.post('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/savejob', values, {
                headers: { Authorization: localStorage.getItem('token') },
                params: {
                    email: localStorage.getItem("email")
                }
            })
                .then(response => {
                    console.log(response)
                    dispatch({ type: 'SAVEJOB', payload: response, statusCode: response.status })
                })
                .catch(error => {
                    dispatch({ type: 'SAVEJOB', payload: error.response.data, statusCode: error.response.status })
                });
        }
    }
}

export default (connect(mapStateToProps, mapDispatchStateToProps))(DisplayJobDetail);