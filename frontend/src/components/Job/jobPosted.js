import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class JobsPosted extends Component {

    constructor(props) {

        super(props);

        this.state = {
            postedJobs: [],
            totalPages: "",
            noPostedJobs: "",
            errormsg: ""
        }
    }

    componentDidMount() {
        this.getPostedJobs(1)
    }

    getPostedJobs(page) {
        this.setState({
            noPostedJobs: ""
        })
        axios.get('http://localhost:3001/recruiter/jobs/posted',
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
                        postedJobs: response.data.jobs,
                        totalPages: response.data.totalPages
                    })
                    if (response.data.jobs.length == 0) {
                        this.setState({

                            noPostedJobs: "No Posted Jobs",
                            postedJobs: []
                        })
                    }
                    console.log(response)
                }
                else {
                    this.setState({
                        postedJobs: []
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
        this.getPostedJobs(selected)

    }

    render() {
        console.log(this.state.noPostedJobs)
        
        let displayPostedJobs = this.state.postedJobs.map(jobs => {
            return (
                
                    <div className="col-md-12 savedJobsCards">
                        <div className="col-md-2 savedJobsLogo">

                        </div>
                        <div className="col-md-10 bottom-border-jobs">
                        <div className="col-md-7 savedJobsDetails">

                            <h5><b>{jobs.title}</b> - <span> {jobs.employmentType}</span></h5> 
                            
                            <h6>{jobs.companyName}</h6>
                            <br/>
                            <p>{jobs.city}</p>
                            
                        </div>
                        <div align="right" class="col-md-2">
                            <button type="button" class="btn btn-outline-secondary" style={{ marginTop: "20px", border: "1px solid #B8BDBE"}} >Edit Job</button>

                        </div>
                       
                        </div>
                       
                    </div>
               
            )
        })

        return (
            <div className="containerFluid" style={{ marginTop: "52px" }}>
                
                <div className="col-md-12">
                <p style={{ color: "red" }}>{this.state.noSavedJobs}</p>
                <p style={{ color: "red" }}>{this.state.errormsg}</p>
                </div>
                <div className="col-md-12 ">
                <div className="col-md-12">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 savedJobsBox" style={{paddingTop:"0px"}}>
                    <div className="col-md-12 savedJobsBanner">
                     <h4 > Jobs Posted</h4>
                    </div>
                       
                        {displayPostedJobs}
                        
                    </div>
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
            </div>
            
            )


    }
}

export default JobsPosted;