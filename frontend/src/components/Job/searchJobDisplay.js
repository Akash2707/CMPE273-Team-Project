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
                    <div>
                        <div class="col-md-1 nav-main__inbug-container fl mr3">
                            <div id="inbug-nav-item" class="nav-item--inbug" lang="en">
                                <span class="nav-item__icon nav-item__icon--inbug" lang="en" aria-role="presentation">
                                    <li-icon aria-hidden="true" type="linkedin-bug" size="34dp" color="brand">
                                        <svg preserveAspectRatio="xMinYMin meet" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                            <g class="scaling-icon" style={{ fillOpacity: "1" }}><defs></defs>
                                                <g class="bug-34dp" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g class="dp-1"><path d="M2.8,34 L31.2,34 C32.746,34 34,32.746 34,31.2 L34,2.8 C34,1.254 32.746,0 31.2,0 L2.8,0 C1.254,0 0,1.254 0,2.8 L0,31.2 C0,32.746 1.254,34 2.8,34" class="bug-text-color" fill="#FFFFFF"></path><path d="M2.8,34 L31.2,34 C32.746,34 34,32.746 34,31.2 L34,2.8 C34,1.254 32.746,0 31.2,0 L2.8,0 C1.254,0 0,1.254 0,2.8 L0,31.2 C0,32.746 1.254,34 2.8,34 Z M13,13 L17.75,13 L17.75,15.391 C18.387,14.114 20.242,12.75 22.695,12.75 C27.397,12.75 29,14.875 29,19.922 L29,29 L24,29 L24,20.984 C24,18.328 23.481,16.875 21.542,16.875 C18.921,16.875 18,18.867 18,20.984 L18,29 L13,29 L13,13 Z M5,29 L10,29 L10,13 L5,13 L5,29 Z M10.55,7.5 C10.55,9.184 9.184,10.55 7.5,10.55 C5.816,10.55 4.45,9.184 4.45,7.5 C4.45,5.815 5.816,4.45 7.5,4.45 C9.184,4.45 10.55,5.815 10.55,7.5 Z" class="background" fill="#0077B5"></path></g>
                                                    <g class="dpi-gt1" transform="scale(0.7083)"><rect class="bug-text-color" fill="#FFFFFF" x="1" y="1" width="46" height="46" rx="4"></rect><path d="M0,4.00989318 C0,1.79529033 1.79405245,0 4.00989318,0 L43.9901068,0 C46.2047097,0 48,1.79405245 48,4.00989318 L48,43.9901068 C48,46.2047097 46.2059475,48 43.9901068,48 L4.00989318,48 C1.79529033,48 0,46.2059475 0,43.9901068 L0,4.00989318 Z M19,18.3 L25.5,18.3 L25.5,21.566 C26.437,19.688 28.838,18 32.445,18 C39.359,18 41,21.738 41,28.597 L41,41.3 L34,41.3 L34,30.159 C34,26.253 33.063,24.05 30.68,24.05 C27.375,24.05 26,26.425 26,30.159 L26,41.3 L19,41.3 L19,18.3 Z M7,41 L14,41 L14,18 L7,18 L7,41 Z M15,10.5 C15,12.985 12.985,15 10.5,15 C8.015,15 6,12.985 6,10.5 C6,8.015 8.015,6 10.5,6 C12.985,6 15,8.015 15,10.5 Z" class="background" fill="#0077B5"></path></g></g>
                                            </g>
                                        </svg>
                                    </li-icon>
                                </span>
                            </div>
                        </div>
                        <div className="col-md-3" style={{ marginTop: "3px" }}>Easy Apply</div>
                    </div>
                )
            }
            return (
                <div className="col-md-12 savedJobsCards" style={{ height: "250px" }} onClick={() => { this.jobDetailPage(job) }}>
                    <div className="col-md-2 savedJobsLogo">
                        <img height="80px" width="80px" src={job.companyLogo}></img>
                    </div>
                    <div className="col-md-9 savedJobsDetails">
                        <h5><b>{job.title}</b></h5>
                        <h6>{job.companyName}</h6>
                        <p>{job.city}</p>
                        <p className="block-ellipsis">{job.description}</p>
                        <div class="col-md-12" style={{ marginTop: "10px" }}>
                            <div className="col-md-3"> {job.created_at}
                            </div>
                            {easyApply}
                        </div>
                    </div>
                </div>
            )
        })

        return (

            <div className="containerFluid" style={{ marginTop: "52px" }}>
                <div className="col-md-12 savedJobsBanner">
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
                    <div className="col-md-3"></div>
                    <div className="col-md-6 savedJobsBox">
                        {jobs}
                    </div>
                    <div className="col-md-3"></div>

                </div>
                <div style={{ margin: "auto", textAlign: "center" }}>
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

            axios.get('http://NodeLoadBalancer-253592956.us-east-2.elb.amazonaws.com:3001/search/jobs', {
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