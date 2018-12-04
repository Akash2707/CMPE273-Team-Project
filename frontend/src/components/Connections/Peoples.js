import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router';
import './../../connection.css'
import connectionPic from './connection.png'
import invitation from './invitation.png'
import ReactPaginate from 'react-paginate';
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
            connectcount: 0,
            sent: 1, rev: 2, con: 3
        }
        this.onConnect = this.onConnect.bind(this)
        // this.searchPageCount=this.searchPageCount.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)

    }
    componentDidMount() {
        axios.defaults.withCredentials = true;
        axios.get('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/getRecommendPeople', {
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
        axios.put('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/sendrequest', {
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
        axios.get('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/searchpeople', {
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
        axios.post('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/requestwithdraw', {
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
        axios.post('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/requestaccept', {
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
        if (this.state.hasReq.includes(people)) {
            this.props.history.push({
                pathname: '/viewprofile',
                state: {
                    email: people,
                    st: this.state.rev

                }
            })
        }
        else if (this.state.sentReq.includes(people)) {
            this.props.history.push({
                pathname: '/viewprofile',
                state: {
                    email: people,
                    st: this.state.sent
                }
            })
        }
        else if (this.state.connected.includes(people)) {
            this.props.history.push({
                pathname: '/viewprofile',
                state: {
                    email: people,
                    st: this.state.con

                }
            })
        }
        else {
            this.props.history.push({
                pathname: '/viewprofile',
                state: {
                    email: people,
                    st: 3

                }
            })
        }

    }

    render() {
        let redirectVar = null
        if (!localStorage.getItem('email')) {
            redirectVar = <Redirect to="/login" />
        }
        let searchResults = null;
        if (this.state.peoples.length != 0) {
            searchResults = this.state.peoples.map(peoples => {

                let ButtonDisplay = null
                if (this.state.hasReq.includes(peoples.email)) {

                    ButtonDisplay = <button style={{ margin: "20px 5px 0px 35px" }} type="button" class="btn btn-success" onClick={this.onAccept.bind(this, peoples.email)}>Accept</button>
                }
                //else if(peoples.requests.receiverequest.includes(localStorage.getItem('email'))){
                else if (this.state.sentReq.includes(peoples.email)) {

                    ButtonDisplay = ButtonDisplay = <button style={{ margin: "20px 5px 0px 35px" }} type="button" class="btn btn-secondary" onClick={this.onWithdraw.bind(this, peoples.email)}>Withdraw</button>

                }
                else if (this.state.connected.includes(peoples.email)) {
                    //else if(peoples.requests.connectionlistlist.includes(localStorage.getItem('email'))){
                    ButtonDisplay = ButtonDisplay = ButtonDisplay = <button style={{ margin: "20px 5px 0px 35px" }} type="button" class="btn btn-warning" onClick={this.viewConnection.bind(this, peoples.email)}>View Profile</button>

                } else {
                    ButtonDisplay = <button style={{ margin: "20px 5px 0px 35px" }} type="button" class="btn btn-primary" onClick={this.onConnect.bind(this, peoples.email)}>Connect</button>
                }
                return (
                    <div className="col-md-12 search-result-box">
                        <div className="col-md-3 search-image-box" onClick={this.viewConnection.bind(this, peoples.email)}>
                            <img className="search-image-person" src={peoples.imageUrl} />
                        </div>
                        <div className="col-md-6">
                            <h4 style={{ marginTop: "20px", textAlign: "left", color: "#042B89", marginLeft: "20px" }}>{peoples.fName}  {peoples.lName}</h4>
                            <p style={{ textAlign: "left", fontSize: "15px", marginLeft: "20px" }}>{peoples.occupation}</p>
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
        let paginate = null
        if (searchResults != null) {
            paginate = (
            <div className="col-md-12">
                <div className="col-md-4"></div>
                <div className="col-md-5" style={{ margin: "auto", textAlign: "center" }}>
                    <ReactPaginate previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={<a href="">...</a>}
                        breakClassName={"break-me"}
                        pageCount={this.state.searchPageCount}
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



        console.log(this.state.peoples)
        let RecommendResults = this.state.recommendPeople.map(recommend => {
            return (
                <div className="col-md-3 people-box">
                    <div className="col-md-12 image-box" onClick={this.viewConnection.bind(this, recommend.email)}>
                        <img className="image-person" src="https://bootdey.com/img/Content/user_1.jpg" />
                    </div>
                    <div className="col-md-12">
                        <h6 style={{ marginTop: "20px", textAlign: "center", color: "#042B89" }}>{recommend.fName} {recommend.lName}</h6>
                        <p style={{ textAlign: "center", fontSize: "15px" }}>{recommend.occupation}</p>
                        {/* <button onclick={this.viewConnection.bind(this,recommend.email)} >See Profile</button> */}
                        <button onClick={this.onConnect.bind(this, recommend.email)} style={{ margin: "10px 5px 0px 35px" }} type="button" class="btn btn-primary">Connect</button>
                    </div>
                </div>
            )
        })

        return (
            <div className="col-md-12" style={{ margin: "auto", marginTop: "70px" }} >
                {redirectVar}
                <a id='connectioncount' href='/peoples'>
                    <div className="col-md-2">
                        <div className="col-md-12 your-connection-box">
                            <img src={connectionPic} style={{ marginTop: "45px" }} />
                            <h1 style={{ marginTop: "20px", textAlign: "center", color: "#042B89" }}>{this.state.connectcount}</h1>
                            <p style={{ textAlign: "center", fontSize: "20px" }}>Your Connections</p>
                        </div>
                    </div>
                </a>

                <div className="col-md-8">
                    <div className="col-md-12" style={{ marginLeft: "50px" }}>
                        <input type="text" name="search" placeholder="Search.." onChange={this.searchtextHandler.bind(this)}
                            style={{
                                width: "650px",
                                boxSizing: "border-box",
                                border: "2px solid #ccc",
                                borderRadius: "4px",
                                fontSize: "16px",
                                backgroundColor: "white",
                                backgroundPosition: "10px 10px",
                                backgroundRepeat: "no-repeat",
                                padding: "12px 20px 12px 40px",
                                webkitTransition: "width 0.4s ease-in-out",
                                transition: "width 0.4s ease-in-out"
                            }} />
                        <button style={{ margin: "5px" }} type="button" class="btn btn-primary" onClick={this.SearchHandler.bind(this, this.state.searchPageCount)}>Search</button>
                    </div>

                    <div className="col-md-12 connection-box">

                        {searchResults}
                        {paginate}
                    </div>
                

                    <div className="col-md-12 connection-box">
                        {/* <div className="col-md-12"> */}
                        <div className="col-md-12" style={{ border: "1px solid #B6B6B9", marginBottom: "0px", backgroundColor: "#ffffff", padding: "20px" }}>
                            <h2 style={{ color: "#0C96D2", textAlign: "left" }}>Connections</h2>
                        </div>
                        {RecommendResults}
                        {/* </div> */}
                    </div>
                </div>

                <a id='request-list' href='/getRequests'>
                    <div className="col-md-2">
                        <div className="col-md-12 invitation-box">
                            <img src={invitation} style={{ marginTop: "35px" }} />
                            <p style={{ textAlign: "center", fontSize: "20px", marginTop: "20px" }}>Your Invitation</p>

                            <p style={{ textAlign: "center", fontSize: "15px", color: "#0F1AF2", marginTop: "5px", fontWeight: "bold" }}>Manage All</p>

                        </div>
                    </div>
                </a>
            </div>
        )
    }
}
export default Peoples;
