import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';

import jwt_decode from 'jwt-decode';

import "../../cssFiles/first.css"

class Login extends Component {

    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email: "",
            password: "",
            loginFlag: ""
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        
    }

    componentWillMount(){
        this.setState({
            loginFlag : false
        })
    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <input className="form-control" type="text" {...field.input} placeholder="Email"
                />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>

        )
    }

    renderPass(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <input className="form-control" type="password" {...field.input} placeholder="Password" />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>

        )
    }

    //username change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    onSubmit(values) { 
        this.props.onSubmitHandle(values)
    }
   

    render() {
        const { handleSubmit } = this.props;
        let redirect = null;
        if (redirect == null && this.props.loginFlag) {
            console.log(' end of login page ... ', this.props.recruiterCheck)
            if(this.props.recruiterCheck)
                redirect = <Redirect to="/recruiterHome" />
            else
                redirect = <Redirect to="/applicantHome" />
        }
        return (

        <div>
            <div class="header"> 
                <div class="wrapper">
                    <h1>
                        <img class="header" alt="LinkedIn" src="https://static.licdn.com/sc/h/95o6rrc5ws6mlw6wqzy0xgj7y" />
                    </h1>
                </div>
            </div>
            
         
            <div class="main">
                <center> 
                
                    <div class="box">
                        {redirect}
                        <div>
                               
                            <div id="info1"> Be great at what you do</div>
                            <div id="info2"> Get started - it's free.</div>
                            <Link to="/signup">Join Now</Link>
                            <br/>
                            <br/>
                            <p style={{ "color": "#FF0000" }}> {this.props.message}</p>
                            <div class="login-div">
                                <div class="panel"> </div>
                                    
                                {/* //handleSubmit is the method that comes from redux and it tells redux what to do with the submitted form data
                                //Field is a component of redux that does the wiring of inputs to the redux store. */}
                                <div class="form">
                                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                                    <Field
                                        name="email"
                                        component={this.renderField}
                                        onChange={this.emailChangeHandler}
                                    />
                                        
                                    <Field
                                        name="password"
                                        component={this.renderPass}
                                        onChange={this.passwordChangeHandler}
                                    />
                                        
                                    <button type="submit" className="btn btn-primary btn-lg" style={{marginTop: '15px'}}>Sign in </button>
                                            
                                    </form>
                                </div>
                            </div>  
                        </div>
                    </div>
                </center>
            </div>
        </div>
        );
    }
}


function validate(values) {

    const errors = {};

    // Validate the inputs from 'values'
    if (!values.email) {
        errors.email = "Enter an email";
    }
    if (!values.password) {
        errors.password = "Enter Password";
    }

    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
}

const mapStateToProps = state => {
    return {
        loginFlag: state.mainReducer.loginflag,
        message: state.mainReducer.message,
        recruiterCheck : state.mainReducer.recruiter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitHandle: (data) => {
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/login', data)
                .then((response) => {
                    if(response.data.status === 200){
                        localStorage.setItem('token', response.data.token);
                        const decoded = jwt_decode(response.data.token);
                        console.log(decoded);
                        localStorage.setItem('id', decoded.id);
                        localStorage.setItem('email', decoded.email);
                        localStorage.setItem('isRecruiter', decoded.isRecruiter);
                    }
                    dispatch({ type: 'LOGIN', payload: response.data, statusCode: response.data.status })
                })
                .catch((error) => {
                    dispatch({ type: 'LOGIN', payload: error.response, statusCode: error.response})
                });
        }
    }
}


export default reduxForm({
    validate,
    form: "login"
})(connect(mapStateToProps, mapDispatchToProps)(Login));

