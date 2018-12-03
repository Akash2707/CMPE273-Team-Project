import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import PDFReader from "react-pdf-reader";
import "react-pdf-reader/dist/TextLayerBuilder.css";

class ViewApplicants extends Component {

    constructor(props) {

        super(props);

        this.state = {
            applicants: [],
            totalPages: "",
            noApplicants: "",
            errormsg: "",
            id: "",
            allowEasyApply: ""
        }
    }

    componentDidMount() {
        try{
            this.setState({
            id: this.props.location.state.jobId,
            allowEasyApply: this.props.location.state.allowEasyApply
            })
            this.getApplicants(1)
        }catch (e){
            this.setState({
            noApplicants: "Error while fetching Applicants",
            applicants: []
            })
        }
    }

    getApplicants(page) {
        this.setState({
            noApplicants: ""
        })
        var jobId = ""
        var allowEasyApply = false
        if(this.state.id == ""){
            jobId = this.props.location.state.jobId
            allowEasyApply= this.props.location.state.allowEasyApply
        }else{
            jobId = this.state.id
            allowEasyApply = this.state.allowEasyApply
        }
        axios.get('http://localhost:3001/job/applicants',
            {
                headers: { Authorization: localStorage.getItem('token') },
                params: {
                    email: localStorage.getItem('email'),
                    pageNo: page,
                    id: jobId,
                    allowEasyApply: allowEasyApply
                }
            })
            .then((response) => {
                console.log(response)
                //update the state with the response data
                if (response.status === 200) {
                    this.setState({
                        applicants: response.data.applications,
                        totalPages: response.data.totalPages
                    })
                    if (response.data.jobs.length == 0) {
                        this.setState({

                            noApplicants: "No Posted Jobs",
                            applicants: []
                        })
                    }
                    console.log(response)
                }
                else {
                    this.setState({
                        applicants: []
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
        this.getApplicants(selected)

    }



    render() {
        console.log(this.state.noApplicants)
        
        let displayApplicants = this.state.applicants.map(applicant => {
            return (
                
                    <div className="col-md-12 applicantsCards bottom-border-jobs">
                        
                        <div className="col-md-12 savedJobsDetails">

                            <h5><b>Name: {applicant.fName} {applicant.lName}</b></h5> 
                            <h6>Email: {applicant.email}</h6>
                            <h6>City: {applicant.address}</h6>
                            <h6>Phone: {applicant.phone}</h6>
                            <PDFReader
                                file={applicant.resume}
                                renderType="canvas"
                            />
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
                     <h4 > Applicants</h4>
                    </div>
                       
                        {displayApplicants}
                        
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

export default ViewApplicants;