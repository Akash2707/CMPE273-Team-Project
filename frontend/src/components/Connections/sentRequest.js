import React,{Component} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import ReactPaginate from 'react-paginate';
import connectionPic from './connection.png'
import { Redirect } from 'react-router';
class sentRequest extends Component{
    constructor(props){
        super(props);
        this.state={
            requests:[],
            isReqFail:false,
            count:0,
            sent:1
        }
    }
    componentDidMount(){
        
        axios.defaults.withCredentials =true;
        axios.get('http://localhost:3001/getsentRequests', {headers: { Authorization: localStorage.getItem('token')},
       params: {
           email: localStorage.getItem('email')
       }})
        .then((response)=>{
            this.setState({
                requests:response.data.data,
                count:response.data.count
            });
        });
    }
    viewConnection(people,e){
        this.props.history.push({
            pathname:'/viewprofile',
            state:{
                email:people,
                st:this.state.sent

            }
        })   
     }
     onWithdraw(connection_email,e){
        axios.defaults.withCredentials=true;
        axios.post('http://localhost:3001/requestwithdraw', {headers: { Authorization: localStorage.getItem('token')},
        params: {
            user_email:localStorage.getItem('email'),
            connection_email:connection_email
        }})
        .then((response=>{
            if(response.status==400){
                this.setState({
                    isReqFail:true
                })
            }
            window.location.reload()

        }))
    }
    

    render(){
        let redirectVar = null
        if (!localStorage.getItem('email')) {
            redirectVar = <Redirect to="/login" />
            }
        let allRequests = null;
        if(this.state.requests !=0){
         allRequests = this.state.requests.map(requests =>{
            return(
                <div className="col-md-12 request-result-box" >
                <div className="col-md-3 search-image-box" onClick={this.viewConnection.bind(this,requests.email)}>
                    <img className="search-image-person" src={requests.imageUrl} />
                </div>
                <div className="col-md-7">
                    <h4 style={{ marginTop: "20px", textAlign: "left", color: "#042B89", marginLeft: "20px" }}>{requests.fName} {requests.lName}</h4>
                    <p style={{ textAlign: "left", fontSize: "15px", marginLeft: "20px" }}>{requests.occupation} </p>
                </div>
                <div className="col-md-3">
                    <button style={{ margin: "30px 5px 0px 0px" }} type="button" class="btn btn-secondary" onClick={this.onWithdraw.bind(this,requests.email)}>Withdraw</button>
                   
                </div>
            </div>
            )
        })
    }else{
        allRequests= (
        <div className="col-md-12" style={{color:"red", textAlign:"center", fontWeight:"bold"}}>
            <h3>No Request Found</h3>
        </div>
        )
    }

        return(
            <div className="col-md-12">
            {redirectVar}
            <div className="col-md-1"></div>
            <div className="col-md-8 manage-invitation-box">
                <h4 style={{ marginTop: "20px",color: "#042B89", fontWeight:"bold" }}>Manage Send Requests</h4>
                <h6 style={{textAlign:"right"}}>Total Request Send: {this.state.count}</h6>
                <a href="/getRequests"><button style={{ margin: "15px 5px 0px 0px" }} type="button" class="btn btn-primary">Received Requests</button></a>
                <a href="/sentrequest"><button style={{ margin: "15px 5px 0px 35px" }} type="button" class="btn btn-primary">Sent Requests</button></a>
                <hr style={{border:"1px solid #C4C8C8"}}/>
                {allRequests}
            </div>
                <div className= "col-md-1"></div>
                <a href='/peoples'>
                <div className="col-md-3" >
                <div className="col-md-12 invitation-box" style={{marginTop:"80px"}}>
                    <img src={connectionPic} style={{marginTop:"45px"}}/>
                    <p style={{ textAlign: "center", fontSize: "20px" }}>Your Connections</p>
                    </div>
                </div>
                </a>
            </div>
        )
    }

}

export default sentRequest;