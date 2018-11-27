import React,{Component} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

class receivedRequest extends Component{
    constructor(props){
        super(props);
        this.state={
            requests:[],
            isReqFail:false
        }
    }
    componentDidMount(){
        
        axios.defaults.withCredentials =true;
        axios.get('http://NodeLoadBalancer-253592956.us-east-2.elb.amazonaws.com:3001/getRequests', {headers: { Authorization: localStorage.getItem('token')},
       params: {
           email: localStorage.getItem('email')
       }})
        .then((response)=>{
            this.setState({
                requests:this.state.requests.concat(response.data)
            });
        });
    }
    onAccept(connection_email,e){
        axios.defaults.withCredentials=true;
        axios.post('http://NodeLoadBalancer-253592956.us-east-2.elb.amazonaws.com:3001/requestaccept', {headers: { Authorization: localStorage.getItem('token')},
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

        }))
    }
    onDeny(connection_email,e){
        axios.defaults.withCredentials=true;
        axios.post('http://NodeLoadBalancer-253592956.us-east-2.elb.amazonaws.com:3001/requestdeny', {headers: { Authorization: localStorage.getItem('token')},
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

        }))
    }
    render(){
        let allRequests = this.state.requests.map(requests =>{
            return(
            <div class="row " style={{margin:'5px',border:'1px solid grey',backgroundColor:'#f7f7f8'}}>
                                   <div class="col-md-4">
                        <img src="https://farm3.staticflickr.com/2911/14160612230_c6e33d42bd_k.jpg" class="cards_img" style={{marginTop:'10px',width:'60px',height:'60px',borderRadius:'30px'}}/>
                        </div>
                        <div class="col-md-5 px-3" >
                        <div class="card-block px-3" style={{marginLeft:'-45px'}}>
                        <div>
                            <h5 class="card-title" style={{fontSize:'14px'}}>First Name:{requests}</h5>
                                                <p class="card-text">Post information</p>                   
                        </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                    <button style={{width:'70px',height:'30px',fontSize:'12px',alignContent:'center',marginTop:'15px'}} type='button' class='btn btn-primary'onClick={this.onAccept.bind(this,requests)}>Accept</button>
                    <button style={{width:'70px',height:'30px',fontSize:'12px',alignContent:'center',marginTop:'10px'}}type='button' class='btn btn-primary'onClick={this.onDeny.bind(this,requests)}>Deny</button>
                        </div>
                       
                    </div>
                    
            
              
            )
        })
        return(
            <div class="container" style={{marginTop:'55px'}}>
                <h3>Tabs</h3>
             <ul class="nav nav-tabs">
                <li class="active"><a href="/getRequests">Received Requests</a></li>
                <li><a href="/sentrequest">Sent Requests</a></li>
            </ul>

            <div class='row'>
            <div class='col-md-6'>
            <div class="card" style={{width:400}}>
                {allRequests}
            </div>
            </div>
            <div class='col-md-3'>
                    <div class='left-container' style={{height:'300px'}}>
                        <div id='connectionview' class='mn-connections-summary'>
                            <div class='pt4'style={{margin:'center',paddingTop:'70px'}}>
                                <a id='connectioncount' style={{textAlign:'center',paddingTop:10}} class='link-without-hover-state' href='/peoples'>
                                    <h3 class='mn-connections-summary_count t-32 t-black t-normal mt3' aria-label='Your connections'>183</h3>
                                </a>
                                    <h5 class='mn-connections-summary_title t-16 t-black t-bold mt2 ph3' style={{textAlign:'center',paddingTop:10}} aria-hidden='true'>Your Connections</h5>
                                <a id='connectionlist'  style={{textAlign:'center',paddingTop:10}} class='mn-connections-summary_see-all t-14 t-black t-bold inline-block mt1 mb4 ph3 ' href='/peoples'>
                                           <h6> See all</h6> 
                                </a>
                                <a id='facepile'  style={{textAlign:'center',paddingTop:10}} class='mn-connections-summary_facepile link-without-hover-state ph3'>
                                    <div class='mn-social-proof'>
                                        <div class='mn-social-proof_facepiles'>
                                        <img class='lazy-image mn-social-proof_profile-image  img-circle ' style={{borderColor:'white', borderWidth:'10px'}} alt='name' height='40' width='40' src='https://media.licdn.com/dms/image/C5603AQEEkeXAd1Dk_A/profile-displayphoto-shrink_100_100/0?e=1548892800&v=beta&t=me3DWLG-lKs9gpPIBHpNUUhHI9cRQCJaBAA8MpNWN0c'/>
                                        <img class='lazy-image mn-social-proof_profile-image  img-circle ' style={{marginLeft:-16,borderColor:'white',borderWidth:'10px'}} alt='name' height='40' width='40' src='https://media.licdn.com/dms/image/C5603AQEEkeXAd1Dk_A/profile-displayphoto-shrink_100_100/0?e=1548892800&v=beta&t=me3DWLG-lKs9gpPIBHpNUUhHI9cRQCJaBAA8MpNWN0c'/>
                                        <img class='lazy-image mn-social-proof_profile-image  img-circle ' style={{marginLeft:-16,borderColor:'white',borderWidth:'10px'}} alt='name' height='40' width='40' src='https://media.licdn.com/dms/image/C5603AQEEkeXAd1Dk_A/profile-displayphoto-shrink_100_100/0?e=1548892800&v=beta&t=me3DWLG-lKs9gpPIBHpNUUhHI9cRQCJaBAA8MpNWN0c'/>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                       

                    </div>
            </div>
    
            </div>
            
        )
    }
}
export default receivedRequest;