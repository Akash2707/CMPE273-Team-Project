import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './People.css';
import ReactPaginate from 'react-paginate';
//import { connect } from 'http2';

class People extends Component{
    constructor(props){
        super(props);
        this.state={
            
            peoples:[],
            isReqFail:false,
            onSuccess:false,
            errorMessage:'',
            connectionlist:[],
            q:'',
            searchPageCount:1,
            recommendPeople:[],
            connected:[],
            sentReq:[],
            hasReq:[],
            connectcount:0
            
        }
        this.onConnect=this.onConnect.bind(this)
       // this.searchPageCount=this.searchPageCount.bind(this)
        this.handlePageClick=this.handlePageClick.bind(this)
    }
    
    
    componentDidMount(){
        axios.defaults.withCredentials=true;
        axios.get('http://localhost:3001/getRecommendPeople', {headers: { Authorization: localStorage.getItem('token')},
       params: {
           email: localStorage.getItem('email')
       }})
        .then((response)=>{
            console.log(' response from Recommend users :')
            console.log(response.data)
            this.setState({
                recommendPeople:response.data.data,
                connectcount:response.data.count
            });
        });
    }

    searchtextHandler(e){
        this.setState({
            q:e.target.value
        })
    }
    onConnect(email,e){
        //   var data={sender_email:localStorage.getItem('email'),reciever_email:email}
           axios.defaults.withCredentials=true;
           axios.put('http://localhost:3001/sendrequest', {headers: { Authorization: localStorage.getItem('token')},
           params: {
               sender_email: localStorage.getItem('email'),
               reciever_email:email
           }})
           .then((response=>{
            window.location.reload()
               if(response.status==400){
                   this.setState({
                       isReqFail:true
                   })
               }
   
           }))
       }
    SearchHandler(pageNo=1){
       // e.preventDefault();
        axios.defaults.withCredentials =true;
        console.log("hii")
       axios.get('http://localhost:3001/searchpeople', {headers: { Authorization: localStorage.getItem('token')},
       params: {
           email: localStorage.getItem('email'),
           q:this.state.q,
           page:pageNo
    
       }})
           .then(response => {
               console.log(" response from search user : ", response);
               console.log(' The result : ', response.data.result)
               console.log(' The totalpages : ', response.data.totalpages)
               if (response.status === 200) {
                   this.setState({
                       peoples: response.data.result,
                       searchPageCount:response.data.totalpages,
                       connected:response.data.connect,
                       sentReq:response.data.sentReq,
                       hasReq:response.data.hasReq,
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

    onWithdraw(connection_email,e){
        console.log(connection_email)
        axios.defaults.withCredentials=true;
        axios.post('http://localhost:3001/requestwithdraw', {headers: { Authorization: localStorage.getItem('token')},
        params: {
            user_email:localStorage.getItem('email'),
            connection_email:connection_email
        }})
        .then((response=>{
            window.location.reload()
            console.log(response)
            if(response.status==400){
                this.setState({
                    isReqFail:true
                })
            }

        }))
        .catch(error => {
            console.log('error',error)
            this.setState({
                onSuccess: false,
                errorMessage: error.data
            })
        })
    }
    onAccept(connection_email,e){
        axios.defaults.withCredentials=true;
        axios.post('http://localhost:3001/requestaccept', {headers: { Authorization: localStorage.getItem('token')},
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
   viewConnection(people,e){
       this.props.history.push({
           pathname:'/viewprofile',
           state:{
               email:people
           }
       })   
    }
    render(){
       console.log(this.state.peoples)
       let RecommendResults=this.state.recommendPeople.map(recommend=>{
           return(
        <div class="card" style={{width:'200px',height:'150px'}}>
        <img class="card-img-top"  style={{width:'40px',height:'40px',borderRadius:'20px'}}src="https://bootdey.com/img/Content/user_1.jpg" alt="Card image"/>
        <div class="card-body">
          <h2 class="card-title">{recommend.fName} {recommend.lName}</h2>
          <p class="card-text" style={{fontSize:'10px'}}>{recommend.location}</p>
          <p class="card-text"  style={{fontSize:'10px'}}>{recommend.occupation}</p>
          <a onclick={this.viewConnection.bind(this,recommend.email)} class="btn btn-primary"  style={{width:'50px',height:'30px' ,fontSize:'10px'}}>See Profile</a>
        </div>
      </div>)
       })
        let searchResults=this.state.peoples.map(peoples=>{
             let Button1=null;
            
            //if(peoples.requests.sendrequest.includes(localStorage.getItem('email'))){
                if(this.state.hasReq.includes(peoples.email)){
                Button1=(<div class='pull-right btn-group-md' >
                <a class='btn btn-success tooltips' data-placement='top' data-toggle='tooltip' data-original-title='Connect1' onClick={this.onAccept.bind(this,peoples.email)}>
                    <i class='fa fa-handshake-o'>Accept</i>
                </a>
            </div>
)}
//else if(peoples.requests.receiverequest.includes(localStorage.getItem('email'))){
else if(this.state.sentReq.includes(peoples.email)){
Button1=(<div class='pull-right btn-group-md' >
<a class='btn btn-success tooltips' data-placement='top' data-toggle='tooltip' data-original-title='Connect' onClick={this.onWithdraw.bind(this,peoples.email)}>
    <i class='fa fa-handshake-o'>Withdraw</i>
</a>
</div>)

}
else if(this.state.connected.includes(peoples.email)){
//else if(peoples.requests.connectionlistlist.includes(localStorage.getItem('email'))){
    Button1=(<div class='pull-right btn-group-md' >
<a class='btn btn-success tooltips' data-placement='top' data-toggle='tooltip' data-original-title='Connect1' onClick={this.viewConnection.bind(this,peoples.email)}>
    <i class='fa fa-handshake-o'>View Profile</i>
</a>
</div>)
}else{
    Button1=(<div class='pull-right btn-group-md' >
    <a  class='btn btn-success tooltips' data-placement='top' data-toggle='tooltip' data-original-title='Connect' onClick={this.onConnect.bind(this,peoples.email)}>
        <i class='fa fa-handshake-o'>Connect</i>
    </a>
    </div>)
} 
            
            return(
                <div class='row'>
                <div col='col-md-10'>
                    <div class='panel'>
                        <div class='panel-body p-t-10'>
                         <div class='media-main'>
                            <a class='pull-left'  href='#'>
                                <img class='thumb-lg img-circle bx-s' src='https://bootdey.com/img/Content/user_1.jpg' alt='hello'></img>
                            </a>
                            {Button1}
                       {/*  <div class='pull-right btn-group-md' >
                            <a href='#' class='btn btn-success tooltips' data-placement='top' data-toggle='tooltip' data-original-title='Connect' onClick={this.onConnect.bind(this,peoples.email)}>
                                <i class='fa fa-handshake-o'></i>
                            </a>
                        </div> */}
                        <div class='info'>
                            <a onClick={this.viewConnection.bind(this,peoples.email)}><h4>{peoples.fName}  {peoples.lName}</h4></a>
                            <p class='text-muted'>Occupation</p>
                        </div>
                        <div class="clearfix"></div>
                    <hr/>
                         </div>

                        </div>
                     
                    </div>

                </div>

            </div>
            )
        })
        return(
            <div style={{marginTop:'65px'}}>
                <div class='container'>
                    <div class='col-md-3'>
                    <div class='left-container' style={{height:'300px'}}>
                        <div id='connectionview' class='mn-connections-summary'>
                            <div class='pt4'style={{margin:'center',paddingTop:'70px'}}>
                                <a id='connectioncount' style={{textAlign:'center',paddingTop:10}} class='link-without-hover-state' href='/peoples'>
                                    <h3 class='mn-connections-summary_count t-32 t-black t-normal mt3' aria-label='Your connections'>{this.state.connectcount}</h3>
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
                    <div class='col-md-4' id='middle-container' style={{padding:'30px',marginLeft:'20px'}}>
            <div class='search-panel'>
            <div class='input-group' id='group1' style={{width:'320px',height:'10px'}}>
                                <textarea type='text' maxLength = "30"  name='searchinput' class='form-control' placeholder='Search' onChange={this.searchtextHandler.bind(this)}/>   
                                 <span class='input-group-btn'>
                                    <button type='button' id='searchbutton' class='btn btn-effect-ripple btn-primary' ><i class='fa fa-search' onClick={this.SearchHandler.bind(this,this.state.searchPageCount)}> Search</i></button>
                                   </span>
                                </div>
            <div class='row' style={{marginTop:'25px'}}>
                <div class='col-md-12'>
                    <div class='panel panel-default'>
                        <div class='panel-body p-t-0'>
                                {RecommendResults}
                                {searchResults}

                                <div style={{ margin: "auto", textAlign: "center" }}>
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
                                {this.state.q}
                       
                        </div>
 
                                            
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class='col-md-2'>
                <div class='right-container' style={{height:'150px'}}>
                <div id='requestview' class='mn-requests-summary'>
                            <div class='pt4'style={{margin:'center',paddingTop:'20px'}}>
                                <a id='requestcount' style={{textAlign:'center',paddingTop:10}} class='link-without-hover-state' href='/getRequests'>
                                    <h3 class='mn-connections-summary_count t-32 t-black t-normal mt3' aria-label='Your connections'>183</h3>
                                </a>
                                    <h5 class='mn-connections-summary_title t-16 t-black t-bold mt2 ph3' style={{textAlign:'center',paddingTop:10}} aria-hidden='true'>All Invitations</h5>
                                <a id='request-list'  style={{textAlign:'center',paddingTop:10}} class='mn-requests-summary_see-all t-14 t-black t-bold inline-block mt1 mb4 ph3 ' href='/getRequests'>
                                           <h6> Manage all</h6> 
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
export default People;