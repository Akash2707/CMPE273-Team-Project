import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';
import ReactChartkick, { BarChart, PieChart, ColumnChart } from 'react-chartkick'
import Chart from 'chart.js';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

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
            selectedJob2: "",
            cityWiseGraphData: [],
            traceGraphData: [],
            jobs: {},
            location: localStorage.getItem('state'),
            selectedJobId2: "",
            viewTop10ApplicantsData: []
        }
        this.onDropdownSelected = this.onDropdownSelected.bind(this);
        this.onDropdownSelected2 = this.onDropdownSelected2.bind(this);
        this.locationChangeHandle = this.locationChangeHandle.bind(this);
    }

    onDropdownSelected(e) {
        console.log("THE VAL", e.target.value);
        axios.defaults.withCredentials = true;
        axios.get('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/getapplicantsbycity', {
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

    onDropdownSelected2(e) {
        console.log("THE VAL", e.target.value);
        this.setState({
            location: this.state.location
        })
        axios.defaults.withCredentials = true;
        axios.get('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/traceUsers', {
            headers: { Authorization: localStorage.getItem('token') },
            params: {
                recruiterId: localStorage.getItem(''),
                jobId: e.target.value,
                location: this.state.location
            }
        })
            .then(response => {
                console.log(response)
                var groupWiseData = []
                response.data.map(tData => {
                    groupWiseData.push([tData['_id'], tData['total']])
                })
                console.log(groupWiseData)
                this.setState({
                    traceGraphData: groupWiseData
                })
            })
            .catch(error => {
                console.log("Error : ", error);
                this.setState({

                })
            });

        //here you will see the current selected value of the select input
    }

    locationChangeHandle = location => {
        this.setState({ location });
        axios.defaults.withCredentials = true;
        axios.get('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/traceUsers', {
            headers: { Authorization: localStorage.getItem('token') },
            params: {
                recruiterId: localStorage.getItem(''),
                jobId: this.state.selectedJobId2,
                location: location
            }
        })
            .then(response => {
                console.log(response)
                var groupWiseData = []
                response.data.map(tData => {
                    groupWiseData.push([tData['_id'], tData['total']])
                })
                console.log(groupWiseData)
                this.setState({
                    traceGraphData: groupWiseData
                })
            })
            .catch(error => {
                console.log("Error : ", error);
                this.setState({

                })
            });
    };

    componentDidMount() {
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.get('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/getSavedApplicationGraph', {
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
        axios.get('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/getjobsviewcount', {
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
        axios.get('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/getlessnoofapplicants', {
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
        axios.get('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/getjobstitle', {
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
                axios.get('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/getapplicantsbycity', {
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
                axios.get('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/traceUsers', {
                    headers: { Authorization: localStorage.getItem('token') },
                    params: {
                        recruiterId: localStorage.getItem('email'),
                        jobId: jobData[0]['_id'],
                        location: localStorage.getItem('state')
                    }
                })
                    .then(response => {
                        console.log(response)
                        var groupWiseData = []
                        response.data.map(tData => {
                            groupWiseData.push([tData['_id'], tData['total']])
                        })
                        console.log(groupWiseData)
                        this.setState({
                            traceGraphData: groupWiseData
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
                axios.get('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/gettoptennoofapplicants', {
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
                            viewTop10ApplicantsData: data
                        })
                    })
                    .catch(error => {
                        console.log("Error : ", error);
                        this.setState({

                        })
                    });
            })
            .catch(error => {
                console.log("Error : ", error);
                this.setState({

                })
            });


    }
    render() {
        let redirectVar = null;
        if (!localStorage.getItem('email') || localStorage.getItem('isRecruiter') == 'false') {
        redirectVar = <Redirect to="/login" />
        }

        return (
            <div className="" style={{ marginTop: "52px" }}>
                {redirectVar}
                <div className="col-md-12">
                    <div className="col-md-6 card" style={{ marginTop: "52px", padding: "25px", height: '500px' }}>
                        <h4 style={{ marginBottom: "60px" }}>Saved Applications</h4>
                        <PieChart data={this.state.savedGraphData} donut={true} legend="bottom" />
                    </div>
                    <div className="col-md-6 card" style={{ marginTop: "52px", padding: "25px", height: '500px' }}>
                        <h4 style={{ marginBottom: "60px" }}>Number of clicks on Job</h4>
                        <BarChart data={this.state.viewCountGraphData} colors={["#3c92c0"]} xtitle="Number of Clicks"/>
                    </div>
                </div>
                <div className="col-md-12" >
                    <div className="col-md-6 card" style={{ padding: "25px", height: '500px' }}>
                        <h5 style={{ marginBottom: "10px" }}>Trace Users</h5>
                        <span><label style={{ marginRight: "10px" }}>Select Job:</label><select type='select' onChange={this.onDropdownSelected2} defaultValue={this.state.selectedJob2}>{this.state.jobOptions}</select></span>
                        <PlacesAutocomplete value={this.state.location} defaultValue={this.state.location} onChange={this.locationChangeHandle}>
                            {({ getInputProps, getSuggestionItemProps, suggestions, loading }) => (
                                <div className="autocomplete-root">
                                    <div id="info3">State/Region/City</div>
                                    <input {...getInputProps({ className: 'form-control form-group', name: "location", type: "text", autoComplete: "noop" })} />
                                    <div className="autocomplete-dropdown-container">
                                        {loading && <div>Loading...</div>}
                                        {suggestions.map(suggestion => (
                                            <div {...getSuggestionItemProps(suggestion)}>
                                                <span>{suggestion.description}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                        <BarChart data={this.state.traceGraphData} colors={["#415aa8"]} />
                    </div>
                    <div className="col-md-6 card" style={{ padding: "25px", height: '500px' }}>
                        <h5 style={{ marginBottom: "20px" }}>City wise applications</h5>
                        <span ><label style={{ marginRight: "10px" }}>Select Job:</label><select type='select' style={{ marginBottom: "40px" }} onChange={this.onDropdownSelected} defaultValue={this.state.selectedJob}>{this.state.jobOptions}</select></span>
                        <PieChart data={this.state.cityWiseGraphData} donut={true} legend="bottom" />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="col-md-6 card" style={{ padding: "25px", height: '500px' }}>
                        <h5 style={{ marginBottom: "60px" }}>Number of applications of Top 10 job posting</h5>
                        <ColumnChart data={this.state.viewTop10ApplicantsData} colors={["#b12a00"]} ytitle="Number of Applicants"/>
                    </div>
                    <div className="col-md-6 card" style={{ padding: "25px", height: '500px' }}>
                        <h5 style={{ marginBottom: "60px" }}>Top 5 job posting with less number of applications</h5>
                        <ColumnChart data={this.state.viewLessApplicantsData} colors={["#209445"]} ytitle="Number of Applicants"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default RecruiterHome;