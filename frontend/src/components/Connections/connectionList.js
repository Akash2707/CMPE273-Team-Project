import React,{Component} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import ReactPaginate from 'react-paginate';
import { Redirect } from 'react-router';

class connectionList extends Component{
    constructor(props){
        super(props);
        this.state={
            connections:[],
            isConnectionGet:false,
            isProfileGet:false,
            searchPageCount:1,
            connectcount:0,
            con:3
        }
    }
    componentDidMount(){

        //  this.getConnections()
            axios.defaults.withCredentials=true;
          axios.get('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/getConnections', {headers: { Authorization: localStorage.getItem('token')},
         params: {
             email: localStorage.getItem('email')
         }})
          .then(response=>{
              console.log(' The result', response.data)
              this.setState({
                  connections:response.data.data,
                  connectcount:response.data.count
              });
          }).catch(err=>{
              console.log(err)
          });
       }
       viewConnection(people,e){
          this.props.history.push({
              pathname:'/viewprofile',
              state:{
                  email:people,
                  st:this.state.con
              }
          })   
       }
       Message(name,email,url,e){
          this.props.history.push({
              pathname:'/messaging',
              state:{
                  name:name,
                  email : email,
                  profilePhoto : url
              }
          })   
       }
       onRemove(connection_email,e){
          axios.defaults.withCredentials=true;
          axios.post('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/removeconnect', {headers: { Authorization: localStorage.getItem('token')},
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
        let connections = null;
        let redirectVar = null
        if (!localStorage.getItem('email')) {
            redirectVar = <Redirect to="/login" />
            }
        if(this.state.connections !=0){
            connections = this.state.connections.map(connections =>{
            return(
                <div className="col-md-12 request-result-box"  style={{marginTop:"10px"}}>
                <div className="col-md-3 search-image-box" onClick={this.viewConnection.bind(this,connections.email)}>
                    <img className="search-image-person" src={connections.imageUrl} />
                </div>
                <div className="col-md-7">
                    <h4 style={{ marginTop: "20px", textAlign: "left", color: "#000000", marginLeft: "20px" }}>{connections.fName} {connections.lName}</h4>
                    <a onClick={this.viewConnection.bind(this,connections.email)}><label style={{marginLeft:"20px", textDecoration:"underline", color:"blue"}}>View Profile</label></a>
                </div>
                <div className="col-md-3">
                <button style={{ margin: "30px 5px 0px 0px" }} type="button" class="btn btn-primary" onClick={this.Message.bind(this,connections.fName + " " + connections.lName,connections.email,connections.imageUrl)}>Message</button>
                    <button style={{ margin: "30px 5px 0px 0px" }} type="button" class="btn btn-secondary" onClick={this.onRemove.bind(this,connections.email)}>Remove</button>
                   
                </div>
            </div>
            )
        })
    }else{
        connections= (
        <div className="col-md-12" style={{color:"red", textAlign:"center", fontWeight:"bold"}}>
            <h3>No Request Found</h3>
        </div>
        )
    }
          return(
            <div className="col-md-12">
                {redirectVar}
            <div className="col-md-1"></div>
            <div className="col-md-10 manage-invitation-box">
                <h3 style={{ marginTop: "20px",color: "#042B89", fontWeight:"bold" }}>Your Connections</h3>
                <h5>Total Connections: {this.state.connectcount}</h5>
                <hr style={{border:"1px solid #C4C8C8"}}/>
                {connections}
            </div>
            </div>
          )
      }
}
export default connectionList;