import React,{Component} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';

class SearchPeople extends Component{
    constructor(props){
        super(props);
        this.state={
            peoples:[],
            isReqFail:false,
            onSuccess:false,
            errorMessage:''
        }
    }
    componentDidMount(){
        /*
        axios.defaults.withCredentials =true;
        axios.get('http://localhost:3001/searchpeople')
        .then((response)=>{
            this.setState({
                peoples:this.state.peoples.concat(response.data)
            });
        });
        */
       for(var i in localStorage) {
        console.log(i + ' = ' + localStorage[i]);
    }
       console.log(localStorage.getItem('semail'))
       axios.defaults.withCredentials =true;
       axios.get('http://localhost:3001/searchpeople', {headers: { Authorization: localStorage.getItem('token')},
       params: {
           email: localStorage.getItem('email')
       }})
           .then(response => {
               console.log("Status Code : ", response);
               if (response.status === 200) {
                   this.setState({
                       peoples: this.state.peoples.concat(response.data),
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
    onConnect(email,e){
     //   var data={sender_email:localStorage.getItem('email'),reciever_email:email}
        axios.defaults.withCredentials=true;
        axios.put('http://localhost:3001/sendrequest', {headers: { Authorization: localStorage.getItem('token')},
        params: {
            sender_email: localStorage.getItem('decoded_email'),
            reciever_email:email
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
        let searchResults = this.state.peoples.map(peoples =>{
            return(
                <div class="row " style={{margin:'5px',border:'1px solid grey',backgroundColor:'#f7f7f8'}}>
                                   <div class="col-md-4">
                        <img src="https://farm3.staticflickr.com/2911/14160612230_c6e33d42bd_k.jpg" class="cards_img" style={{marginTop:'10px',width:'60px',height:'60px',borderRadius:'30px'}}/>
                        </div>
                        <div class="col-md-5 px-3" >
                        <div class="card-block px-3" style={{marginLeft:'-45px'}}>
                        <div>
                            <h5 class="card-title" style={{fontSize:'14px'}}>First Name:{peoples.email}</h5>
                                                <p class="card-text">Post information</p>                   
                        </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                    <button style={{width:'70px',height:'30px',fontSize:'12px',alignContent:'center',marginTop:'10px'}}type='button' class='btn btn-primary'onClick={this.onConnect.bind(this,peoples.email)}>Connect</button>
                        </div>
                    </div>
            
            )
        })
        return(
            <div class='container'style={{marginTop:'55px'}}>
             <div class="card" style={{width:400}}>
             {searchResults}
            </div> 
                
            
             <Link to='/peoples'>Click here</Link>
            </div>
        )
    }
}
export default SearchPeople;