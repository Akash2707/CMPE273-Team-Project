import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead';
import '../../profileCss/Profile.css'


class ViewProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            skills: [],
            profilePhoto: "http://localhost:3001/download/userdefault.png",
            imageURL: "",
            fName: "",
            lName: "",
            headline: "",
            education: "",
            country: "",
            zipCode: "",
            userLocation: "",
            industry: "",
            phone: "",
            address: "",
            summary: "",
            resume: "",
            connect : false,
            kk:0
           
        }
        this.isConnected = this.isConnected.bind(this);
    }

    componentDidMount() {
        try{
        var email=this.props.location.state.email;
        }catch(e){}
        console.log(email)
        axios.get('http://localhost:3001/recruiter/profile',
            {
                //  headers: { Authorization: localStorage.getItem('token') },
                params: {
                    email: email

                }
            })
            .then((response) => {
                console.log(response)

                //update the state with the response data
                this.setState({
                    profile: response.data,
                    imageURL: response.data.imageURL,
                    fName: response.data.fName,
                    lName: response.data.lName,
                    headline: response.data.headline,
                    education: response.data.uniEducation,
                    country: response.data.country,
                    zipCode: response.data.zipCode,
                    userLocation: response.data.state,
                    industry: response.data.industry,
                    phone: response.data.phone,
                    address: response.data.address,
                    summary: response.data.summary,
                    resume: response.data.resume,
                })
            }).catch(error => {
                console.log("else")
                this.setState({
                    getProfileMessage: error.response.data.error
                })
            });
            console.log(this.state.userLocation)
    }

    isConnected(){
        if(this.state.connect == false){
            this.setState ({
                connect : true
            })
        }
    }
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
                this.setState({kk:4})
             //  window.location.reload()
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
                this.setState({kk:3})
                if (response.status == 400) {
                    this.setState({
                        isReqFail: true
                    })
                }
                //window.location.reload()

            }))
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
                this.setState({kk:1})
                //window.location.reload()
                if (response.status == 400) {
                    this.setState({
                        isReqFail: true
                    })
                }

            }))
    }
    onRemove(connection_email,e){
        axios.defaults.withCredentials=true;
        axios.post('http://localhost:3001/removeconnect', {headers: { Authorization: localStorage.getItem('token')},
        params: {
            user_email:localStorage.getItem('email'),
            connection_email:connection_email
        }})
        .then((response=>{
            this.setState({kk:4})
            if(response.status==400){
                this.setState({
                    isReqFail:true
                })
            }
           // window.location.reload()

        }))
    }

    render() {
        console.log(this.state.expCheck);
        var dropdown = null;
        var expdropDown = null;
        let redirectVar = null;

        if (!localStorage.getItem('email') ) {
            redirectVar = <Redirect to="/login" />
        }

        let skills = null;
        if (this.state.profile.skills != null) {
            skills = this.state.profile.skills.split(',').map(skill => {
                return <li style={{ marginLeft: "40px" }}>{skill}</li>
            })
        }
        let connected = null;
        //console.log(st)
        var check=this.props.location.state.st
        if(this.state.kk!=0){
            check=this.state.kk
            console.log(check)
        }
        if(check== 1){
            connected =  <input class="btn btn-success " onClick={this.onWithdraw.bind(this, this.props.location.state.email)} type="submit" value="Withdraw" />
        }else if(check == 2){
            connected =  <input class="btn btn-primary " onClick={this.onAccept.bind(this, this.props.location.state.email)} type="submit" value="Accept" />
        }
        else if(check == 3){
            connected =  <input class="btn btn-success " onClick={this.onRemove.bind(this, this.props.location.state.email)} type="submit" value="Remove" />
        }else{
            connected =  <input class="btn btn-primary " onClick={this.onConnect.bind(this, this.props.location.state.email)} type="submit" value="Connect" />
        }
        let experiences = null;
        if (this.state.profile.experience != null) {
            experiences = this.state.profile.experience.map((experience, index) => {
                console.log(experience.company);
                return (
                    <div>
                        <hr style={{ marginLeft: "30px", marginRight: "30px" , padding : "0px" }} />
                        <ul>
                            <div class="pv-entity__summary-info pv-entity__summary-info--background-section mb2">
                                <div className="row" >
                                    <div className="col-md-10">
                                        <h3 class="t-16 t-black t-bold">{experience.position}</h3>
                                    </div>
                                </div>
                                <h4 class="t-16 t-black t-normal">
                                    <span class="visually-hidden">Company Name</span>
                                    <span class="pv-entity__secondary-title">{experience.company}</span>
                                </h4>

                                <div class="display-flex">
                                    <h4 className="pv-entity__date-range t-14 t-black--light t-normal experience-month">
                                        <span className="visually-hidden">Dates Employed</span>
                                        <span className="text muted">{experience.from} – {experience.to}</span>
                                    </h4>
                                </div>

                                <h4 class="pv-entity__location t-14 t-black--light t-normal block experience-month">
                                    <span className="visually-hidden">Location</span>
                                    <span>{experience.compLocation}</span>
                                </h4>

                            </div>


                            <div id="ember375" class="pv-entity__extra-details ember-view">
                                <p id="ember377" class="pv-entity__description t-14 t-black t-normal ember-view" style={{ marginRight: "40px", textAlign: "justify" }}>
                                    <span class="lt-line-clamp__line">{experience.compDescription}
                                    </span>
                                </p>
                            </div>
                        </ul>
                    </div>
                )
            })
        }

        let educations = null;
        if (this.state.profile.education != null) {
            educations = this.state.profile.education.map((education, index) => {
                return (
                    <div>
                        <hr style={{ marginLeft: "30px", marginRight: "30px" ,  padding : "0px" }} />
                        <ul>
                            <div class="pv-entity__summary-info pv-entity__summary-info--background-section mb2">
                                <div className="row" >
                                    <div className="col-md-10">
                                        <h4 class="t-16 t-black t-bold">{education.school}</h4>
                                    </div>
                                </div>
                                <h5 class="t-16 t-black t-normal">
                                    <span class="visually-hidden">Field of Study</span>
                                    <span class="pv-entity__secondary-title">{education.degree} - {education.field}</span>
                                </h5>

                                <div class="display-flex">
                                    <h4 className="pv-entity__date-range t-14 t-black--light t-normal experience-month">
                                        <span className="visually-hidden">Dates of Education</span>
                                        <span className="text muted">{education.fromYear} - {education.toYear}</span>
                                    </h4>
                                </div>
                            </div>
                        </ul>
                    </div>
                )
            })
        }

        return (
            <div style={{ margin: "auto", maxWidth: "70%", marginTop: "50px" }}>
            {redirectVar}
                <div className="card">
                    <img className="card-img-top" style={{ width: "100%" }} src="http://svgur.com/i/66g.svg" alt="Card image cap" />
                    <div className="pv-top-card-section__profile-photo-container pv-top-card-v2-section__profile-photo-container" >
                        <div className="pv-top-card-v2-section__photo-wrapper pv-top-card-section__photo-wrapper">
                            <div id="ember638" className="pv-top-card-section__edit-photo pv-top-card-v2-section__edit-photo profile-photo-edit ember-view">
                                <button data-control-name="edit_profile_photo" className="profile-photo-edit__edit-btn" data-ember-action="" data-ember-action-639="639" disabled>
                                    <img src={this.state.profile.profilePhoto} className="profile-photo-edit__preview" alt="Edit photo" height="128" width="128" />
                                    {/* <span className="profile-photo-edit__edit-icon svg-icon-wrap">
                                    <li-icon aria-hidden="true" type="pencil-icon" size="small">
                                        <svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" preserveAspectRatio="xMinYMin meet" className="artdeco-icon" focusable="false">
                                            <path d="M14.71,4L12,1.29a1,1,0,0,0-1.41,0L3,8.85,1,15l6.15-2,7.55-7.55A1,1,0,0,0,15,4.71,1,1,0,0,0,14.71,4Zm-8.84,7.6-1.5-1.5L9.42,5.07l1.5,1.5Zm5.72-5.72-1.5-1.5,1.17-1.17,1.5,1.5Z" className="small-icon" style={{ fillOpacity: 1 }}></path>
                                        </svg>
                                    </li-icon>
                                </span> */}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="card-text">
                            <div className="row" style={{ marginTop: "20 px", padding: "40px" , marginBottom : "-30px" }}>
                                <div className="col-md-8" style={{ padding: "0px" }}>
                                    <div>
                                        <h3>
                                            {this.state.profile.fName}  {this.state.profile.lName}
                                        </h3>
                                    </div>
                                    <div>
                                        <span>
                                            {this.state.profile.headline}
                                        </span>
                                    </div>
                                    <span className="text-muted">
                                        {this.state.profile.state}
                                    </span>
                                    <div style = {{marginTop : "10px"}}>
                                        {connected}
                                      </div>
                                </div>

                                <div className="col-md-4" style={{ padding: "0px" }}>
                                    <div className="col-md-12" >
                                        <div className="col-md-2" style={{ padding: "0px", textAlign: "right" }}>
                                        </div>

                                        <div className="col-md-10" style={{ padding: "0px" }}>
                                            <button href="#education-section" data-control-name="education_see_more" className="pv-top-card-v2-section__link pv-top-card-v2-section__link-education mb1" data-ember-action="" style={{ marginBottom: "8px" }} data-ember-action-77="77">
                                                <span id="ember79" className="pv-top-card-v2-section__entity-name pv-top-card-v2-section__school-name text-align-left ml2 t-14 user-prof t-bold lt-line-clamp lt-line-clamp--multi-line ember-view" style={{ WebkitLineClamp: "2" }}>  {this.state.profile.uniEducation}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <a data-control-name="topcard_view_all_connections" id="ember81" className="pv-top-card-v2-section__link pv-top-card-v2-section__link--connections ember-view">
                                            <div className="col-md-12" >
                                                <div className="col-md-2" style={{ padding: "0px", textAlign: "right" }}>
                                                    <span className="svg-icon-wrap">
                                                        <li-icon aria-hidden="true" type="people-icon" className="pv-top-card-v2-section__icon mh1">
                                                            <svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" preserveAspectRatio="xMinYMin meet" className="artdeco-icon" focusable="false">
                                                                <path d="M20.74,14.2L19,13.54V12.86l0.25-.41A5,5,0,0,0,20,9.82V9a3,3,0,0,0-6,0V9.82a5,5,0,0,0,.75,2.63L15,12.86v0.68l-1,.37a4,4,0,0,0-.58-0.28l-2.45-1V10.83A8,8,0,0,0,12,7V6A4,4,0,0,0,4,6V7a8,8,0,0,0,1,3.86v1.84l-2.45,1A4,4,0,0,0,0,17.35V20a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1V17.47A3.5,3.5,0,0,0,20.74,14.2ZM16,8.75a1,1,0,0,1,2,0v1.44a3,3,0,0,1-.38,1.46l-0.33.6a0.25,0.25,0,0,1-.22.13H16.93a0.25,0.25,0,0,1-.22-0.13l-0.33-.6A3,3,0,0,1,16,10.19V8.75ZM6,5.85a2,2,0,0,1,4,0V7.28a6,6,0,0,1-.71,2.83L9,10.72a1,1,0,0,1-.88.53H7.92A1,1,0,0,1,7,10.72l-0.33-.61A6,6,0,0,1,6,7.28V5.85ZM14,19H2V17.25a2,2,0,0,1,1.26-1.86L7,13.92v-1a3,3,0,0,0,1,.18H8a3,3,0,0,0,1-.18v1l3.72,1.42A2,2,0,0,1,14,17.21V19Zm7,0H16V17.35a4,4,0,0,0-.55-2l1.05-.4V14.07a2,2,0,0,0,.4.05h0.2a2,2,0,0,0,.4-0.05v0.88l2.53,1a1.5,1.5,0,0,1,1,1.4V19Z" className="large-icon" style={{ fill: "currentColor" }}></path>
                                                            </svg>
                                                        </li-icon>
                                                    </span>
                                                </div>
                                                <div className="col-md-10" style={{ padding: "0px" }}>
                                                    <span className="pv-top-card-v2-section__entity-name pv-top-card-v2-section__connections ml2 t-14 user-prof t-bold">
                                                        See connections
                                                    </span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div id="ember375" class="pv-entity__extra-details ember-view">
                                <hr style={{ marginLeft: "30px", marginRight: "30px" ,  padding : "0px" }} />
                                <p id="ember377" class="pv-entity__description t-14 t-black t-normal ember-view" style={{ marginRight: "40px", marginLeft: "40px", textAlign: "justify" }}>
                                    <span class="lt-line-clamp__line">{this.state.profile.summary}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card" >
                    <div className="card-body">
                        <header className="pv-profile-section__card-header">
                            <div className="row"  style={{ marginBottom : "-15px" }}>
                                <div className="col-md-10">
                                    <h3 className="experience-black " >
                                        Experience
                                        </h3>
                                </div>
                            </div>
                        </header>
                        {experiences}
                    </div>
                </div>


                <div className="card" >
                    <div className="card-body">
                        <header className="pv-profile-section__card-header">
                            <div className="row"  style={{ marginBottom : "-15px" }} >
                                <div className="col-md-10">
                                    <h3 className="experience-black " >
                                        Education
                                        </h3>
                                </div>
                            </div>
                        </header>
                        {educations}
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <header className="pv-profile-section__card-header">
                            <div className="row" style={{ marginBottom : "-15px" }}>
                                <div className="col-md-9">
                                    <h3 className="experience-black " >
                                        Skills
                                        </h3>
                                </div>
                            </div>
                        </header>
                        <ul>
                            <div class="pv-entity__summary-info pv-entity__summary-info--background-section mb2">
                                <div className="row" >
                                    <div>
                                        <hr style={{padding : "0px" }} />
                                        {skills}
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
               
           
            </div>

        )
    }
}
export default ViewProfile;