import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router';
import './../../connection.css'
class Peoples extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peoples: [],
            isReqFail: false,
            onSuccess: false,
            errorMessage: '',
            connectionlist: [],
            q: '',
            searchPageCount: 1,
            recommendPeople: [],
            connected: [],
            sentReq: [],
            hasReq: [],
            connectcount: 0
        }
        this.onConnect = this.onConnect.bind(this)
        // this.searchPageCount=this.searchPageCount.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)

    }
    componentDidMount() {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/getRecommendPeople', {
            headers: { Authorization: localStorage.getItem('token') },
            params: {
                email: localStorage.getItem('email')
            }
        })
            .then((response) => {
                console.log(' response from Recommend users :')
                console.log(response.data)
                this.setState({
                    recommendPeople: response.data.data,
                    connectcount: response.data.count
                });
            });
    }

    searchtextHandler(e) {
        this.setState({
            q: e.target.value
        })
    }
    onConnect(email, e) {
        //   var data={sender_email:localStorage.getItem('email'),reciever_email:email}
        axios.defaults.withCredentials = true;
        axios.put('http://localhost:3001/sendrequest', {
            headers: { Authorization: localStorage.getItem('token') },
            params: {
                sender_email: localStorage.getItem('email'),
                reciever_email: email
            }
        })
            .then((response => {
                window.location.reload()
                if (response.status == 400) {
                    this.setState({
                        isReqFail: true
                    })
                }

            }))
    }
    SearchHandler(pageNo = 1) {
        // e.preventDefault();
        axios.defaults.withCredentials = true;
        console.log("hii")
        axios.get('http://localhost:3001/searchpeople', {
            headers: { Authorization: localStorage.getItem('token') },
            params: {
                email: localStorage.getItem('email'),
                q: this.state.q,
                page: pageNo

            }
        })
            .then(response => {
                console.log(" response from search user : ", response);
                console.log(' The result : ', response.data.result)
                console.log(' The totalpages : ', response.data.totalpages)
                if (response.status === 200) {
                    this.setState({
                        peoples: response.data.result,
                        searchPageCount: response.data.totalpages,
                        connected: response.data.connect,
                        sentReq: response.data.sentReq,
                        hasReq: response.data.hasReq,
                        onSuccess: true
                    })
                } else {
                    this.setState({
                        onSuccess: false,
                        errorMessage: response.data.message
                    })
                }
            })
            .catch(error => {
                this.setState({
                    onSuccess: false,
                    errorMessage: error.data
                })
            });
    }
    handlePageClick = (data) => {
        //  let value = {}
        /*   value = {
              state: this.state.state,
              industry: this.state.industry,
              jobTitle: this.state.jobTitle,
              jobType: this.state.jobType,
              experience: this.state.experience
          } */
        this.SearchHandler(data.selected + 1)
    };

    onWithdraw(connection_email, e) {
        console.log(connection_email)
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/requestwithdraw', {
            headers: { Authorization: localStorage.getItem('token') },
            params: {
                user_email: localStorage.getItem('email'),
                connection_email: connection_email
            }
        })
            .then((response => {
                window.location.reload()
                console.log(response)
                if (response.status == 400) {
                    this.setState({
                        isReqFail: true
                    })
                }

            }))
            .catch(error => {
                console.log('error', error)
                this.setState({
                    onSuccess: false,
                    errorMessage: error.data
                })
            })
    }
    onAccept(connection_email, e) {
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/requestaccept', {
            headers: { Authorization: localStorage.getItem('token') },
            params: {
                user_email: localStorage.getItem('email'),
                connection_email: connection_email
            }
        })
            .then((response => {

                if (response.status == 400) {
                    this.setState({
                        isReqFail: true
                    })
                }
                window.location.reload()

            }))
    }
    viewConnection(people, e) {
        this.props.history.push({
            pathname: '/viewprofile',
            state: {
                email: people
            }
        })
    }

    render() {

        let searchResults = null;
        if (this.state.peoples.length != 0) {
            searchResults = this.state.peoples.map(peoples => {

                let ButtonDisplay = null
                if (this.state.hasReq.includes(peoples.email)) {

                    ButtonDisplay =  <button style={{ margin: "20px 5px 0px 35px" }} type="button" class="btn btn-success" onClick={this.onAccept.bind(this, peoples.email)}>Connect</button>
                }
                //else if(peoples.requests.receiverequest.includes(localStorage.getItem('email'))){
                else if (this.state.sentReq.includes(peoples.email)) {

                    ButtonDisplay =  ButtonDisplay =  <button style={{ margin: "20px 5px 0px 35px" }} type="button" class="btn btn-secondary" onClick={this.onWithdraw.bind(this, peoples.email)}>Withdraw</button>
                   
                }
                else if (this.state.connected.includes(peoples.email)) {
                    //else if(peoples.requests.connectionlistlist.includes(localStorage.getItem('email'))){
                    ButtonDisplay = ButtonDisplay =  ButtonDisplay =  <button style={{ margin: "20px 5px 0px 35px" }} type="button" class="btn btn-warning" onClick={this.viewConnection.bind(this, peoples.email)}>View Profile</button>
                   
                } else {
                    ButtonDisplay =  <button style={{ margin: "20px 5px 0px 35px" }} type="button" class="btn btn-primary" onClick={this.onConnect.bind(this, peoples.email)}>Connect</button>
                }
                return (
                    <div className="col-md-12 search-result-box">
                        <div className="col-md-3 search-image-box">
                            <img className="search-image-person" src="https://bootdey.com/img/Content/user_1.jpg" />
                        </div>
                        <div className="col-md-6">
                            <h4 style={{ marginTop: "20px", textAlign: "left", color: "#042B89", marginLeft: "20px" }}>{peoples.fName}  {peoples.lName}</h4>
                            <p style={{ textAlign: "left", fontSize: "15px", marginLeft: "20px" }}>occupation</p>
                        </div>
                        <div className="col-md-3">
                            {ButtonDisplay}
                        </div>
                    </div>
                )

            })
        } else {
            searchResults = null;
        }



        console.log(this.state.peoples)
        let RecommendResults = this.state.recommendPeople.map(recommend => {
            return (
                <div className="col-md-4 people-box">
                    <div className="col-md-12 image-box">
                        <img className="image-person" src="https://bootdey.com/img/Content/user_1.jpg" />
                    </div>
                    <div className="col-md-12">
                        <h5 style={{ marginTop: "20px", textAlign: "center", color: "#042B89" }}>{recommend.fName} {recommend.lName}</h5>
                        <p style={{ textAlign: "center", fontSize: "15px" }}>{recommend.occupation}</p>
                        {/* <button onclick={this.viewConnection.bind(this,recommend.email)} >See Profile</button> */}
                        <button style={{ margin: "10px 5px 0px 35px" }} type="button" class="btn btn-primary">Connect</button>
                    </div>
                </div>
            )
        })

        return (



            <div className="col-md-12" style={{ margin: "auto", marginTop: "70px" }} >
                <div className="col-md-2">
                <div className="col-md-12 your-connection-box">
                    <a id='connectioncount' href='/peoples'>
                        <h1 style={{ marginTop: "50%", textAlign: "center", color: "#042B89" }}>{this.state.connectcount}</h1>
                    </a>
                    <p style={{ textAlign: "center", fontSize: "20px" }}>Your Connections</p>
                    <a id='connectionlist' href='/peoples'>
                        <a id='facepile' style={{ textAlign: 'center', paddingTop: 10 }} class='mn-connections-summary_facepile link-without-hover-state ph3'>
                            <div class='mn-social-proof'>
                                <div class='mn-social-proof_facepiles'>
                                    <img class='lazy-image mn-social-proof_profile-image  img-circle ' style={{ borderColor: 'white', borderWidth: '10px' }} alt='name' height='40' width='40' src='https://media.licdn.com/dms/image/C5603AQEEkeXAd1Dk_A/profile-displayphoto-shrink_100_100/0?e=1548892800&v=beta&t=me3DWLG-lKs9gpPIBHpNUUhHI9cRQCJaBAA8MpNWN0c' />
                                    <img class='lazy-image mn-social-proof_profile-image  img-circle ' style={{ marginLeft: -16, borderColor: 'white', borderWidth: '10px' }} alt='name' height='40' width='40' src='https://media.licdn.com/dms/image/C5603AQEEkeXAd1Dk_A/profile-displayphoto-shrink_100_100/0?e=1548892800&v=beta&t=me3DWLG-lKs9gpPIBHpNUUhHI9cRQCJaBAA8MpNWN0c' />
                                    <img class='lazy-image mn-social-proof_profile-image  img-circle ' style={{ marginLeft: -16, borderColor: 'white', borderWidth: '10px' }} alt='name' height='40' width='40' src='https://media.licdn.com/dms/image/C5603AQEEkeXAd1Dk_A/profile-displayphoto-shrink_100_100/0?e=1548892800&v=beta&t=me3DWLG-lKs9gpPIBHpNUUhHI9cRQCJaBAA8MpNWN0c' />
                                </div>
                            </div>
                        </a>
                        <p style={{ textAlign: "center", fontSize: "15px", color: "#0F1AF2", marginTop: "5px", fontWeight: "bold" }}>View All</p>
                    </a>
                    </div>
                </div>

                <div className="col-md-6">
                <div className="col-md-12" style={{marginLeft: "50px"}}>
                    <input type="text" name="search" placeholder="Search.." onChange={this.searchtextHandler.bind(this)} />
                    <button style={{ margin: "5px" }} type="button" class="btn btn-primary" onClick={this.SearchHandler.bind(this, this.state.searchPageCount)}>Search</button>
                </div>

                <div className="col-md-12 connection-box">

                    {searchResults}
                </div>
                <div className="col-md-12 connection-box">
                    {/* <div className="col-md-12"> */}
                        <h2 style={{ fontWeight: "bold", color: "#0C96D2" }}>Connections</h2>
                        <span style={{ width: "90%", textAlign: "center" }}><hr /></span>
                        {RecommendResults}
                    {/* </div> */}
                </div>
                </div>
                <div className= "col-md-1"></div>
                <div className="col-md-2">
                <div className="col-md-12 invitation-box">
                    {/* <a id='requestcount' class='link-without-hover-state' href='/getRequests'>
                        <h1 style={{ marginTop: "30px", textAlign: "center", color: "#042B89" }}>58</h1>
                    </a> */}
                    <p style={{ textAlign: "center", fontSize: "20px" , marginTop:"40px"}}>Your Invitation</p>
                    <a id='request-list' href='/getRequests'>
                        <p style={{ textAlign: "center", fontSize: "15px", color: "#0F1AF2", marginTop: "5px", fontWeight: "bold" }}>Manage All</p>
                    </a>
                </div>
                </div>
            </div>
        )
    }
}
export default Peoples;