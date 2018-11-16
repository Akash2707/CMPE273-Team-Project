import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';

import jwt_decode from 'jwt-decode';


class ApplicantLogin extends Component {

    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email: "",
            password: ""
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        
    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type="text" {...field.input} />
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
                <label>{field.label}</label>
                <input className="form-control" type="password" {...field.input} />
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
        if (redirect == null && this.props.authFlag) {
            console.log("hello");
            redirect = <Redirect to="/home" />
        }
        return (
            <div style={{ backgroundColor: "#f4f4f4" }}>
                <div>
                    {redirect}
                    <div class="container" >
                        <div class="login-form">

                            <h1>Log in to LinkedIn</h1>

                            <div class="main-div">
                                <div class="panel">

                                    <h2>Applicant Login</h2>
                                </div>
                                <p style={{ "color": "#FF0000" }}> {this.props.message}</p>

                                {/* //handleSubmit is the method that comes from redux and it tells redux what to do with the submitted form data
                                //Field is a component of redux that does the wiring of inputs to the redux store. */}
                                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                                    <Field
                                        label="Email"
                                        name="email"
                                        placeholder="Email"
                                        component={this.renderField}
                                        onChange={this.emailChangeHandler}
                                    />

                                    <Field
                                        label="Password"
                                        name="password"
                                        component={this.renderPass}
                                        onChange={this.passwordChangeHandler}
                                    />
                                    <button type="submit" className="btn btn-primary">Submit</button>

                                </form>
                            </div>

                        </div>
                    </div>
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
        authFlag: state.login.authFlag,
        message: state.login.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitHandle: (data) => {
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/travelerlogin', data)
                .then((response) => {
                    localStorage.setItem('token', response.data.token);
                    const decoded = jwt_decode(response.data.token);
                    console.log(decoded);
                    localStorage.setItem('decoded_is_owner', decoded.is_owner);
                    localStorage.setItem('decoded_email', decoded.email);
                    localStorage.setItem('decoded_id', decoded.id);
                    localStorage.setItem('decoded_fname', decoded.first_name);
                    localStorage.setItem('decoded_lname', decoded.last_name);
                    dispatch({ type: 'LOGIN', payload: response.data, statusCode: response.status })
                })
                .catch((error) => {
                    dispatch({ type: 'LOGIN', payload: error.response.data, statusCode: error.response.status })
                });
        }
    }
}


export default reduxForm({
    validate,
    form: "login"
})(connect(mapStateToProps, mapDispatchToProps)(ApplicantLogin));

