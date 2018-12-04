import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import {Page, Document} from "react-pdf";
import PDF from 'react-pdf-js-infinite';
class ViewApplicants extends Component {

    constructor(props) {

        super(props);

        this.state = {
            applicants: [],
            totalPages: "",
            noApplicants: "",
            errormsg: "",
            id: "",
            allowEasyApply: "",
            numPages: null,
            pageNumber: 1,
            resumeFlag: false,
            resumeFileUrl: '',
            resumeApplicant: {}
        }
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages })
    }

    goToPrevPage = () => {
        if(this.state.numPages != 1){
            this.setState(state => ({ pageNumber: this.state.pageNumber - 1 }))
        }
    }

    goToNextPage = () => {
        if(this.state.numPages != 1){
            this.setState(state => ({ pageNumber: this.state.pageNumber + 1 }))
        }
    }

    viewResume = (e) => {
        this.setState({
            resumeFlag: !this.state.resumeFlag,
            resumeFileUrl: e.resume,
            resumeApplicant: e
        })
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
        
        // if(this.state.resumeFlag){
        //     resumeDisplay = (
        //         <div>
        //             <div style={{width: 600}}>
        //                 <Document
        //                     file = {this.state.resumeFileUrl}
        //                     onLoadSuccess = {this.onDocumentLoadSuccess}
        //                 >
        //                     <Page pageNumber={this.state.pageNumber} width={600} />
        //                 </Document>
        //             </div>
        //             <nav>
        //                 <button class="prev-button" onClick={this.goToPrevPage}> Prev </button>
        //                 <button class="prev-button" onClick={this.goToNextPage}> Next </button>
        //             </nav>
        //             <p class= "pagenumber-display">
        //                 Page {this.state.pageNumber} of {this.state.numPages}
        //             </p>
        //         </div>
        //     )
        // }
        
        let displayApplicants = this.state.applicants.map(applicant => {
            let resumeDisplay = null
            if(applicant._id == this.state.resumeApplicant._id && this.state.resumeFlag == true){
                resumeDisplay = (
                    <div>
                        <div style={{width: 600}}>
                            <Document
                                file = {this.state.resumeFileUrl}
                                onLoadSuccess = {this.onDocumentLoadSuccess}
                            >
                                <Page pageNumber={this.state.pageNumber} width={600} />
                            </Document>
                        </div>
                        <nav>
                            <button class="prev-button" onClick={this.goToPrevPage}> Prev </button>
                            <button class="prev-button" onClick={this.goToNextPage}> Next </button>
                        </nav>
                        <p class= "pagenumber-display">
                            Page {this.state.pageNumber} of {this.state.numPages}
                        </p>
                    </div>
                )
            }else{
                resumeDisplay = null
            }
            return (
                
                    <div className="col-md-12 applicantsCards bottom-border-jobs">
                        
                        <div className="col-md-12 applicantDetails">

                            <h5><b>Name: {applicant.fName} {applicant.lName}</b></h5> 
                            <h6>Email: {applicant.email}</h6>
                            <h6>City: {applicant.address}</h6>
                            <h6>Phone: {applicant.phone}</h6>
                            <button className="btn btn-primary" onClick = { () => {this.viewResume(applicant)}} name="ResumeButton" value={applicant.resume}>
                                <span>View Resume</span>
                            </button>
                            {resumeDisplay}
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