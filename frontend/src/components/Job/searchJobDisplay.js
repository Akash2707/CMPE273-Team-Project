import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class SearchJobDisplay extends Component {

    constructor(props) {

        super(props);

        this.state = {
            state: localStorage.getItem("state"),
            jobType: "",
            experience: "",
            jobTitle: "",
            industry: "",
            jobData: {}
        }
        this.stateHandler = this.stateHandler.bind(this);
        this.jobTypeHandler = this.jobTypeHandler.bind(this);
        this.experienceHandler = this.experienceHandler.bind(this);
        this.jobTitleHandler = this.jobTitleHandler.bind(this);
        this.industryHandler = this.industryHandler.bind(this);
        this.jobDetailPage = this.jobDetailPage.bind(this);
    }

    stateHandler = (e) => {
        this.setState({
            state: e.target.value
        });
    }
    jobTypeHandler = (e) => {
        this.setState({
            jobType: e.target.value
        });
    }
    experienceHandler = (e) => {
        this.setState({
            experience: e.target.value
        });
    }
    jobTitleHandler = (e) => {
        this.setState({
            jobTitle: e.target.value
        });
    }
    industryHandler = (e) => {
        this.setState({
            industry: e.target.value
        });
    }

    componentDidMount() {
        this.handleSearch()
    }

    handleSearch = () => {
        let data = {}
        data = {
            state: this.state.state,
            industry: this.state.industry,
            jobTitle: this.state.jobTitle,
            jobType: this.state.jobType,
            experience: this.state.experience
        }
        console.log(data)
        this.props.searchJobs(data)
        this.props.submitSearchJobs(data, 1)
    }

    handlePageClick = (data) => {
        let value = {}
        value = {
            state: this.state.state,
            industry: this.state.industry,
            jobTitle: this.state.jobTitle,
            jobType: this.state.jobType,
            experience: this.state.experience
        }
        this.props.submitSearchJobs(value, data.selected + 1)
    };

    jobDetailPage(job) {
        if (localStorage.getItem('email')) {
            this.props.getDetailJob(job)
            this.setState({
                detailClick: true,
                jobData: job
            })
        } else {
            let detailPage = null
            detailPage = this.props.history.push({
                pathname: "/login",
                state: {
                }
            })
        }
    }

    render() {

        let detailPage = null;

        let redirectVar = null;
        if (!localStorage.getItem('email') || localStorage.getItem('isRecruiter') == 'true') {
            redirectVar = <Redirect to="/login" />
        }

        if (this.state.detailClick) {

            detailPage = this.props.history.push({
                pathname: "/jobs/view",
                state: {
                    job: this.state.jobData,
                }
            })
        }

        let jobs = this.props.searchJobList.map(job => {

            let easyApply = null;
            if (job.allowEasyApply == true) {
                easyApply = (
                    <button style={{ margin: "0px 5px 0px 0px" }} type="button" class="btn btn-primary">Easy Apply</button>
                )
            }
            return (
                <div className="col-md-12 savedJobsCards" style={{ height: "250px" }} onClick={() => { this.jobDetailPage(job) }}>
                    <div className="col-md-2 savedJobsLogo">
                        <img style={{ height: "80px", width: "80px", overflow: "hidden" }} src={job.companyLogo}></img>
                    </div>
                    <div className="col-md-9 savedJobsDetails">
                        <h5><b>{job.title}</b></h5>
                        <h6>{job.companyName}</h6>
                        <span style={{ float: "right" }}> {easyApply}</span>
                        <p>{job.city}</p>
                        <p className="block-ellipsis">{job.description}</p>
                        <span>Job Posted:</span><span>{job.created_at.slice(0, 10)}</span>

                    </div>
                </div>
            )
        })

        return (

            <div className="containerFluid" style={{ marginTop: "52px" }}>
            {redirectVar}
                <div className="col-md-12 savedJobsBanner" style={{ height: "80px" }}>
                    <div className="col-md-2 form-group" >
                        <input type="text" className="form-control" name="state" placeholder="State" onChange={this.stateHandler} defaultValue={this.state.state} />
                    </div>
                    <div className="col-md-2 form-group" >
                        <input type="text" className="form-control" name="industry" placeholder="Industry" onChange={this.industryHandler} defaultValue={this.state.industry} />
                    </div>
                    <div className="col-md-2 form-group" >
                        <input type="text" className="form-control" name="jobTitle" placeholder="Job Title" onChange={this.jobTitleHandler} defaultValue={this.state.jobTitle} />
                    </div>
                    <div className="col-md-2 form-group" >
                        <div class="FormSelect__wrapper">
                            <select aria-label="Choose" name="jobType" class="form-control FormSelect__select" style={{ height: "50px" }} onChange={this.jobTypeHandler} defaultValue={this.state.jobType}>
                                <option value="">Job Type</option>
                                <option value="full-time">Full-Time</option>
                                <option value="part-time">Part-Time</option>
                                <option value="contract"> Contract</option>
                                <option value="internship">Internship </option>
                                <option value="volunteer">Volunteer</option>
                                <option value="temporary">Temporary</option>
                                <option value="other">Other</option>
                            </select>
                            <i aria-hidden="true" class="icon-chevron-down FormSelect__chevron"></i>
                        </div>
                    </div>
                    <div className="col-md-2 form-group" >
                        <div class="FormSelect__wrapper">
                            <select aria-label="Choose" name="experience" class="form-control FormSelect__select" style={{ height: "50px" }} onChange={this.experienceHandler} defaultValue={this.state.experience}>
                                <option value="">Experience Level</option>
                                <option value="internship">Internship</option>
                                <option value="entrylevel">Entry-Level</option>
                                <option value="associate"> Associate</option>
                                <option value="midlevel">Mid-Level Senior </option>
                                <option value="director">Director</option>
                                <option value="executive">Executive</option>
                            </select>
                            <i aria-hidden="true" class="icon-chevron-down FormSelect__chevron"></i>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <button type="button" class="btn btn-primary" style={{ marginTop: "5px" }} onClick={this.handleSearch}>Apply Filter</button>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="col-md-1"></div>
                    <div className="col-md-9">
                        <div className="col-md-12 savedJobsBox">
                            {jobs}
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="col-md-4"></div>
                    <div className="col-md-5" style={{ margin: "auto", textAlign: "center" }}>
                        <ReactPaginate previousLabel={"previous"}
                            nextLabel={"next"}
                            breakLabel={<a href="">...</a>}
                            breakClassName={"break-me"}
                            pageCount={this.props.searchJobPageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        searchRequest: state.jobSearchReducer.searchRequest,
        searchJobList: state.jobSearchReducer.searchJobList,
        searchJobPageCount: state.jobSearchReducer.searchJobPageCount,
    }
}

const mapDispatchStateToProps = dispatch => {
    return {
        searchJobs: (values) => {
            dispatch({ type: 'JOBSEARCH', payload: values })
        },

        submitSearchJobs: (values, page) => {

            axios.defaults.withCredentials = true;
            //make a post request with the user data

            axios.get('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/search/jobs', {
                headers: { Authorization: localStorage.getItem('token') },
                params: {
                    email: localStorage.getItem('email'),
                    pageNo: page,
                    state: values.state,
                    industry: values.industry,
                    jobTitle: values.jobTitle,
                    jobType: values.jobType,
                    experience: values.experience
                }
            })
                .then(response => {
                    dispatch({ type: 'SEARCHJOBRESPONSE', payload: response.data, statusCode: response.status })
                    console.log("Status Code : ", response);
                })
                .catch(error => {
                    dispatch({ type: 'SEARCHJOBRESPONSE', payload: error.response.data, statusCode: error.response.status })
                });
        },
        getDetailJob: (values) => {
            dispatch({ type: 'JOBDETAIL', payload: values })
        }
    }
}

export default (connect(mapStateToProps, mapDispatchStateToProps)(SearchJobDisplay));