import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
class SavedJobs extends Component {

    constructor(props) {

        super(props);

        this.state = {
            savedjobs: [],
            totalPages: "",
            noSavedJobs: "",
            errormsg: ""
        }
    }

    componentDidMount() {
        this.getSavedJobs(1)
    }

    getSavedJobs(page) {
        this.setState({
            noSavedJobs: ""
        })
        axios.get('http://localhost:3001/jobs/saved',
            {
                headers: { Authorization: localStorage.getItem('token') },
                params: {
                    email: localStorage.getItem('email'),
                    pageNo: page,
                }
            })
            .then((response) => {
                console.log(response)
                //update the state with the response data
                if (response.status === 200) {
                    this.setState({
                        savedjobs: response.data.jobs,
                        totalPages: response.data.totalPages
                    })
                    if (this.state.savedjobs.length == 0) {
                        this.setState({

                            noSavedJobs: "No Saved Jobs",
                            savedjobs: []
                        })
                    }
                    console.log(response)
                }
                else {
                    this.setState({
                        savedjobs: []
                    })
                }
            })
            .catch(error => {
                this.setState({
                    errormsg: error.response
                })
            });
    }

    handlePageClick = (data) => {
        let selected = data.selected + 1;
        // this.setState({
        //     currentPage: selected
        // })
        this.getSavedJobs(selected)

    }

    render() {
        let redirectVar = null;
        if (!localStorage.getItem('email') ) {
            redirectVar = <Redirect to="/login" />
        }

        let displaySavedJobs = this.state.savedjobs.map(jobs => {
            return (
                
                    <div className="col-md-12 savedJobsCards">
                        <div className="col-md-2 ">
                            <img style={{height:"100px", width:"100px", overflow:"hidden"}} src={jobs.companyLogo}></img>
                        </div>
                        <div className="col-md-10 bottom-border-jobs">
                        <div className="col-md-7 savedJobsDetails">

                            <h5><b>{jobs.title}</b></h5>
                            <h6>{jobs.companyName}</h6>
                            <br/>
                            <p>{jobs.location}</p>
                            
                        </div>
                        <div align="right" class="col-md-2">
                            <p><i class="glyphicon glyphicon-bookmark" style={{ fontSize: "30px", color: "blue", marginTop: "50%" }} ></i></p>

                        </div>
                       
                        </div>
                       
                    </div>
               
            )
        })

        let displayAppliedJobs =
            (

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
                </div>)

        return (
            <div className="containerFluid" style={{ marginTop: "52px" }}>
                {redirectVar}
             <div className="col-md-12 ">
                 <div className="col-md-7" >
                 <div className="col-md-12">
                <p style={{ color: "red" }}>{this.state.noSavedJobs}</p>
                <p style={{ color: "red" }}>{this.state.errormsg}</p>
                </div>
               
               
                    <div className="col-md-12 savedJobsBox" style={{paddingTop:"0px"}}>
                    <div className="col-md-12 savedJobsBanner">
                     <h4 > Saved Jobs</h4>
                    </div>
                       
                        {displaySavedJobs}
                    </div>
                    <div className="col-md-12">
                    <div className="col-md-5"></div> 
                    <div className="col-md-5">

                            <ReactPaginate previousLabel={"previous"}
                                nextLabel={"next"}
                                breakLabel={<a href="">...</a>}
                                breakClassName={"break-me"}
                                pageCount={this.state.totalPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"} />
                        </div>
                    </div>
                    </div>
                    
                    <div className="col-md-1"></div>
                    {displayAppliedJobs}
                </div>
            </div>
            )}
}

export default SavedJobs;