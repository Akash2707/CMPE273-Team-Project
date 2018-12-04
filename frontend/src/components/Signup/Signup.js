import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import "../../cssFiles/first.css"

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fName: "",
            lName: "",
            isRecruiter: "",
            email: "",
            state: "",
            password: "",
            signupFlag: ""
        }
        this.radioButtonHandler = this.radioButtonHandler.bind(this)
        this.stateChangeHandle = this.stateChangeHandle.bind(this);
    }

    componentWillMount() {
        this.setState({
            signupFlag: false,
        })
    }

    radioButtonHandler = (r) => {
        this.setState({
            isRecruiter: r.target.value
        })
    }

    stateChangeHandle = state => {
        this.setState({ state });
    };

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

    renderEmailField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <label style={{ textAlign: 'left' }}>{field.label}</label>
                <input className="form-control" type="email" {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }

    renderPasswordField(field) {
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

    onSubmit(values) {
        this.props.submitHandle(values, this.state.isRecruiter, this.state.state);
    }

    render() {
        const { handleSubmit } = this.props;
        let redirect = null
        if (redirect == null && this.props.signupFlag) {
            console.log(' end of signup page ... ')
            redirect = <Redirect to='/login' />
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

                {redirect}
                <div class="main">
                    <center>

                        <div class="boxSignup">

                            <div id="info1"> Be great at what you do</div>
                            <div id="info2"> Get started - it's free.</div>
                            <br />
                            <p style={{ "color": "#FF0000" }}> {this.props.message}</p>
                            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                                <div id="info3"> First name</div>
                                <Field
                                    name="fName"
                                    component={this.renderField}
                                />

                                <div id="info3"> Last name</div>
                                <Field
                                    name="lName"
                                    component={this.renderField}
                                />

                                <PlacesAutocomplete value={this.state.state} defaultValue={this.state.state} onChange={this.stateChangeHandle}>
                                    {({ getInputProps, getSuggestionItemProps, suggestions, loading }) => (
                                        <div className="autocomplete-root">
                                            <div id="info3">State/Region/City</div>
                                            <input {...getInputProps({ className: 'form-control form-group', name: "state", type: "text", autoComplete: "noop" })} />
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

                                <div id="info3"> Email Id</div>
                                <Field
                                    name="email"
                                    component={this.renderEmailField}
                                />

                                <div id="info3"> Recruiter
                                    <div class="radio-inline" style={{ marginLeft: '15px' }}>
                                        <input type="radio" class="radio" name="isRecruiter" onChange={this.radioButtonHandler} value="true" style={{ color: 'black' }} />Yes
                                    </div>
                                    <div class="radio-inline">
                                        <input type="radio" class="radio" name="isRecruiter" onChange={this.radioButtonHandler} value="false" />No
                                    </div>
                                </div>

                                <div id="info3"> Password</div>
                                <Field

                                    name="password"
                                    component={this.renderPasswordField}
                                />

                                <button type="submit" className="btn btn-primary ">Join now</button>
                            </form>
                        </div>
                    </center>
                </div>
            </div>
        )
    }
}

function validate(values) {

    const errors = {};

    // Validate the inputs from 'values'
    if (!values.fname) {
        errors.fname = "Enter the First name";
    }
    if (!values.lname) {
        errors.lname = "Enter the Last name";
    }
    if (!values.email) {
        errors.email = "Enter an email";
    }
    if (!values.password) {
        errors.password = "Enter Password";
    }
    if (!values.isRecruiter) {
        errors.isRecruiter = "Enter the isRecruiter field";
    }


    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
}

const mapStateToProps = state => {
    return {
        signupFlag: state.mainReducer.signflag,
        message: state.mainReducer.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitHandle: (data, recruiter, state) => {

            data["isRecruiter"] = recruiter
            data["state"] = state

            axios.defaults.withCredentials = true;
            axios.post('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/signup', data)
                .then((response) => {
                    console.log(response.data)
                    dispatch({ type: 'SIGNUP', payload: response.data, statusCode: response.status })
                })
                .catch((error) => {
                    dispatch({ type: 'SIGNUP', payload: error.response.data, statusCode: error.response.data.status })
                });
        }
    }
}

export default reduxForm({
    validate,
    form: "signup"
})(connect(mapStateToProps, mapDispatchToProps)(Signup));