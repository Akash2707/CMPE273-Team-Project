import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';
import ReactChartkick, { BarChart, PieChart, ColumnChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

class RecruiterHome extends Component {

    constructor(props) {

        super(props);

        this.state = {
            savedGraphData: [],
            viewCountGraphData: [],
            viewLessApplicantsData: [],
            jobOptions: [],
            selectedJob: "",
            cityWiseGraphData: [],
            jobs: {}
        }
        this.onDropdownSelected = this.onDropdownSelected.bind(this);
    }

    onDropdownSelected(e) {
        console.log("THE VAL", e.target.value);
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/getapplicantsbycity', {
            headers: { Authorization: localStorage.getItem('token') },
            params: {
                email: localStorage.getItem('email'),
                jobId: e.target.value,
                easyApply: this.state.jobs[e.target.value]
            }
        })
            .then(response => {
                console.log(response)
                var cityWiseData = []
                response.data.map(city => {
                    cityWiseData.push([city['_id'], city['total']])
                })
                console.log(cityWiseData)
                this.setState({
                    cityWiseGraphData: cityWiseData
                })
            })
            .catch(error => {
                console.log("Error : ", error);
                this.setState({

                })
            });

        //here you will see the current selected value of the select input
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.get('http://localhost:3001/getSavedApplicationGraph', {
            headers: { Authorization: localStorage.getItem('token') },
            params: {
                email: localStorage.getItem('email'),
            }
        })
            .then(response => {
                console.log(response)
                var data = []
                response.data.map(job => {
                    data.push([job['_id'], job['total']])
                })
                console.log(data)
                this.setState({
                    savedGraphData: data
                })
            })
            .catch(error => {
                console.log("Error : ", error);
                this.setState({

                })
            });

        console.log("between")
        axios.get('http://localhost:3001/getjobsviewcount', {
            headers: { Authorization: localStorage.getItem('token') },
            params: {
                email: localStorage.getItem('email'),
            }
        })
            .then(response => {
                console.log(response)
                var data = []
                response.data.map(job => {
                    data.push([job['title'], job['totalViews']])
                })
                console.log(data)
                this.setState({
                    viewCountGraphData: data
                })
            })
            .catch(error => {
                console.log("Error : ", error);
                this.setState({

                })
            });

        console.log("between")
        axios.get('http://localhost:3001/getlessnoofapplicants', {
            headers: { Authorization: localStorage.getItem('token') },
            params: {
                email: localStorage.getItem('email'),
            }
        })
            .then(response => {
                console.log(response)
                var data = []
                response.data.map(job => {
                    data.push([job['title'], job['totalApplicants']])
                })
                console.log(data)
                this.setState({
                    viewLessApplicantsData: data
                })
            })
            .catch(error => {
                console.log("Error : ", error);
                this.setState({

                })
            });

        console.log("between")
        var jobData = null
        axios.get('http://localhost:3001/getjobstitle', {
            headers: { Authorization: localStorage.getItem('token') },
            params: {
                email: localStorage.getItem('email'),
            }
        })
            .then(response => {
                console.log(response)
                let options = []
                let jobs = {}
                jobData = response.data
                response.data.map(job => {
                    options.push(<option value={job['_id']}>{job['title']}</option>);
                    var jobId = job['_id']
                    var jobEasyApply = job['allowEasyApply']
                    jobs[jobId] = jobEasyApply
                })
                console.log(jobData)
                axios.get('http://localhost:3001/getapplicantsbycity', {
                    headers: { Authorization: localStorage.getItem('token') },
                    params: {
                        email: localStorage.getItem('email'),
                        jobId: jobData[0]['_id'],
                        easyApply: jobData[0]['allowEasyApply']
                    }
                })
                    .then(response => {
                        console.log(response)
                        var cityWiseData = []
                        response.data.map(city => {
                            cityWiseData.push([city['_id'], city['total']])
                        })
                        console.log(cityWiseData)
                        this.setState({
                            cityWiseGraphData: cityWiseData
                        })
                    })
                    .catch(error => {
                        console.log("Error : ", error);
                        this.setState({

                        })
                    });
                this.setState({
                    jobOptions: options,
                    jobs: jobs
                })
            })
            .catch(error => {
                console.log("Error : ", error);
                this.setState({

                })
            });


    }
    render() {

        return (
            <div className="" style={{ marginTop: "52px" }}>
                <div className="col-md-12" >
                    <div className="col-md-6 card" style={{ marginTop: "52px", padding: "25px", color: "Red" }}>
                        <h5 style={{ marginBottom: "20px" }}>Top 5 job posting with less number of applications</h5>
                        <ColumnChart data={this.state.viewLessApplicantsData} colors={["#788b39"]} />
                    </div>
                    <div className="col-md-6 card" style={{ marginTop: "52px", padding: "25px", color: "Red", height: '396.3px' }}>
                        <select type='select' onChange={this.onDropdownSelected} defaultValue={this.state.selectedJob}>{this.state.jobOptions}</select>
                        <h5 style={{ marginBottom: "20px" }}>City wise applications</h5>
                        <PieChart data={this.state.cityWiseGraphData} donut={true} legend="bottom" />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="col-md-6 card" style={{ marginTop: "22px", padding: "25px", color: "Red" }}>
                        <h4 style={{ marginBottom: "20px" }}>Saved Applications</h4>
                        <PieChart data={this.state.savedGraphData} donut={true} legend="bottom" />
                    </div>
                    <div className="col-md-6 card" style={{ marginTop: "22px", padding: "25px", color: "Red" }}>
                        <h4 style={{ marginBottom: "20px" }}>Number of clicks on Job</h4>
                        <BarChart data={this.state.viewCountGraphData} colors={["#3c92c0"]} />
                    </div>

                </div>
            </div>
        )
    }
}

export default RecruiterHome;