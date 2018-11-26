import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead';
import '../../profileCss/Profile.css'

class Profile extends Component {

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
            title: "",
            company: "",
            compLocation: "",
            cfMonth: "",
            cfYear: "",
            ctMonth: "",
            ctYear: "",
            cDescription: "",
            school: "",
            degree: "",
            field: "",
            grade: "",
            efYear: "",
            etYear: "",
            eDescription: "",
            eduCheck: "",
            expCheck: "",
            profileMessage: "",
            imageMessage: "",
            expMessage: "",
            eduMessage: "",
            isWorking: false,
            getProfileMessage: ""

        }
        this.onChangeSkillsFunction = this.onChangeSkillsFunction.bind(this);

        this.profileUpdate = this.profileUpdate.bind(this);
        this.experienceUpdate = this.experienceUpdate.bind(this);
        this.isWorking = this.isWorking.bind(this);
        this.imageUpload - this.imageUpload.bind(this);
        this.onImageHandle = this.onImageHandle.bind(this);
        this.skillUpdate = this.skillUpdate.bind(this);
        this.expChangeHandler = this.expChangeHandler.bind(this);
        this.expAddHandler = this.expAddHandler.bind(this);
        this.eduChangeHandler = this.eduChangeHandler.bind(this);
        this.eduAddHandler = this.eduAddHandler.bind(this);
        this.onChangeHandle = this.onChangeHandle.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3001/recruiter/profile',
            {
                headers: { Authorization: localStorage.getItem('token') },
                params: {
                    email: localStorage.getItem('email'),

                }
            })
            .then((response) => {
                console.log(response)
                //update the state with the response data
                this.setState({
                    profile: response.data,
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
                });
                if (response.data.profilePhoto) {
                    this.setState({
                        profilePhoto: response.data.profilePhoto
                    })
                }
            }).catch(error => {
                console.log("else")
                this.setState({
                    getProfileMessage: error.response.data.error
                })
            });
    }

    expChangeHandler() {
        this.setState({
            expCheck: false
        })
    }
    expAddHandler() {
        this.setState({
            expCheck: true
        })
    }
    eduChangeHandler() {
        this.setState({
            eduCheck: false
        })
    }
    eduAddHandler() {
        this.setState({
            eduCheck: true
        })
    }
    onChangeSkillsFunction(values) {
        try {
            if (this.state.skills != values) {
                this.setState({
                    skills: values
                });
            }
        }
        catch (e) { }
    }

    onChangeHandle(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    onExpChangeHandle(event, index) {
        let name = event.target.name
        let profile = this.state.profile
        profile.experience[index][event.target.name] = event.target.value
        this.forceUpdate()
    }

    onEduChangeHandle(event, index) {
        let name = event.target.name
        let profile = this.state.profile
        profile.education[index].event.target.name = event.target.value
        this.forceUpdate()
    }

    onImageHandle(event) {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ profilePhoto: e.target.result });
            };
            reader.readAsDataURL(event.target.files[0]);
            this.setState({
                imageURL: event.target.files[0]
            })
        }
    }


    isWorking() {
        this.setState({
            isWorking: !this.state.isWorking
        })

    }

    imageUpload = (e) => {
        e.preventDefault();
        const image = new FormData();
        image.append("profilePhoto", this.state.imageURL);
        console.log(image);
        axios.defaults.withCredentials = true;
        axios.put('http://localhost:3001/recruiter/profile/imageupload', image,
            {
                headers: { Authorization: localStorage.getItem('token') },
                params: {
                    email: localStorage.getItem('email'),

                }
            })
            .then((response) => {
                console.log(response)
                //update the state with the response data
                this.setState({
                    ImageMessage: response.data.message,
                })
            }).catch(error => {
                console.log("else")
                this.setState({
                    ImageMessage: error.response.data.error
                })
            });
    }

    profileUpdate = (e) => {
        e.preventDefault();
        var data = {
            fName: this.state.fName,
            lName: this.state.lName,
            headline: this.state.headline,
            education: this.state.education,
            country: this.state.country,
            zipCode: this.state.zipCode,
            state: this.state.userLocation,
            industry: this.state.industry,
            phone: this.state.phone,
            address: this.state.address,
            summary: this.state.summary,
            resume: "",
        }
        axios.defaults.withCredentials = true;
        axios.put('http://localhost:3001/recruiter/profile/update', data,
            {
                headers: { Authorization: localStorage.getItem('token') },
                params: {
                    email: localStorage.getItem('email'),

                }
            })
            .then((response) => {
                console.log(response)
                //update the state with the response data
                this.setState({
                    profileMessage: response.data.message,
                })
            }).catch(error => {
                console.log("else")
                this.setState({
                    profileMessage: error.response.data.error
                })
            });
    }

    experienceUpdate = (e) => {
        e.preventDefault();
        if (this.state.expCheck == true) {
            var data = {
                position: this.state.title,
                company: this.state.company,
                compLocation: this.state.compLocation,
                compDescription: this.state.cDescription,
                from: this.state.cfMonth + " " + this.state.cfYear,
                isWorking: this.state.isWorking,
                to: this.state.ctMonth + " " + this.state.ctYear,
                isExpNew: this.state.expCheck
            }
        } else {
            var data = {
                experience: this.state.position.experience,
                isExpNew: this.state.expCheck
            }
        }
        console.log(data);
        axios.defaults.withCredentials = true;
        axios.put('http://localhost:3001/recruiter/profile/experience', data,
            {
                headers: { Authorization: localStorage.getItem('token') },
                params: {
                    email: localStorage.getItem('email'),

                }
            })
            .then((response) => {
                console.log(response)
                //update the state with the response data
                this.setState({
                    expMessage: response.data.message,
                })
            }).catch(error => {
                console.log("else")
                this.setState({
                    expMessage: error.response.data.error
                })
            });
    }

    educationUpdate = (e) => {
        e.preventDefault();
        if (this.state.eduCheck == true) {
            var data = {
                school: this.state.school,
                degree: this.state.degree,
                field: this.state.field,
                grade: this.state.grade,
                fromYear: this.state.efYear,
                toYear: this.state.etYear,
                eduDescription: this.state.eDescription,
                isEduNew: this.state.eduCheck
            }
        } else {
            var data = {
                experience: this.state.position.education,
                isEduNew: this.state.eduCheck
            }
        }
        console.log(data);
        axios.defaults.withCredentials = true;
        axios.put('http://localhost:3001/recruiter/profile/education', data,
            {
                headers: { Authorization: localStorage.getItem('token') },
                params: {
                    email: localStorage.getItem('email'),

                }
            })
            .then((response) => {
                console.log(response)
                //update the state with the response data
                this.setState({
                    eduMessage: response.data.message,
                })
            }).catch(error => {
                console.log("else")
                this.setState({
                    eduMessage: error.response.data.error
                })
            });
    }

    skillUpdate = (e) => {
        e.preventDefault();
        let skills = []
        this.state.skills.map(skill => {
            skills.push(skill.name)
        })

        axios.defaults.withCredentials = true;
        axios.put('http://localhost:3001/recruiter/profile/skills', skills,
            {
                headers: { Authorization: localStorage.getItem('token') },
                params: {
                    email: localStorage.getItem('email'),

                }
            })
            .then((response) => {
                console.log(response)
                //update the state with the response data
                this.setState({
                    skillMessage: response.data.message,
                })
            }).catch(error => {
                console.log("else")
                this.setState({
                    skillMessage: error.response.data.error
                })
            });
    }


    render() {
        console.log(this.state.expCheck);
        var dropdown = null;
        var expdropDown = null;


        if (this.state.isWorking == false) {
            expdropDown = <div className="col-md-6">
                <label>To:</label>
                <select name="ctMonth" onChange={this.onChangeHandle} className="form-control" style={{ width: "100%" }}>
                    <option value="month">Month</option>
                    <option value="january">January</option>
                    <option value="february">February</option>
                    <option value="march">March</option>
                    <option value="april">April</option>
                    <option value="may">May</option>
                    <option value="june">June</option>
                    <option value="july">July</option>
                    <option value="august">August</option>
                    <option value="september">September</option>
                    <option value="october">October</option>
                    <option value="november">November</option>
                    <option value="december">December</option>
                </select>
                <select name="ctYear" onChange={this.onChangeHandle} className="form-control" style={{ width: "100%", marginTop: "10px" }}>
                    <option value="year">Year</option>
                    <option value="1980">1980</option>
                    <option value="1981">1981</option>
                    <option value="1982">1982</option>
                    <option value="1983">1983</option>
                    <option value="1984">1984</option>
                    <option value="1985">1985</option>
                    <option value="1986">1986</option>
                    <option value="1987">1987</option>
                    <option value="1988">1988</option>
                    <option value="1989">1989</option>
                    <option value="1990">1990</option>
                    <option value="1991">1991</option>
                    <option value="1991">1991</option>
                    <option value="1993">1993</option>
                    <option value="1994">1994</option>
                    <option value="1995">1995</option>
                    <option value="1996">1996</option>
                    <option value="1997">1997</option>
                    <option value="1998">1998</option>
                    <option value="1999">1999</option>
                    <option value="2000">2000</option>
                    <option value="2001">2001</option>
                    <option value="2002">2002</option>
                    <option value="2003">2003</option>
                    <option value="2004">2004</option>
                    <option value="2005">2005</option>
                    <option value="2006">2006</option>
                    <option value="2007">2007</option>
                    <option value="2008">2008</option>
                    <option value="2009">2009</option>
                    <option value="2010">2010</option>
                    <option value="2011">2011</option>
                    <option value="2012">2012</option>
                    <option value="2013">2013</option>
                    <option value="2014">2014</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                </select>
            </div>
        } else {
            expdropDown = <div className="col-md-6">
                <label style={{ textAlign: "match-parent", marginTop: "70px" }}>Present</label>
            </div>
        }
        console.log(this.state.profile.experience)

        let skills = null;
        if (this.state.profile.skills != null) {
            skills = this.state.profile.skills.split(',').map(skill => {
                return <li style={{ marginLeft: "40px" }}>{skill}</li>
            })
        }
        let experiences = null;
        if (this.state.profile.experience != null) {
            experiences = this.state.profile.experience.map((experience, index) => {
                console.log(experience.company);
                return (
                    <div>
                        <hr style={{ marginLeft: "30px", marginRight: "30px" }} />
                        <ul>
                            <div class="pv-entity__summary-info pv-entity__summary-info--background-section mb2">
                                <div className="row" >
                                    <div className="col-md-10">
                                        <h3 class="t-16 t-black t-bold">{experience.position}</h3>
                                    </div>
                                    <div className="col-md-2" style={{ textAlign: "center" }}>
                                        <div class="pv-entity__actions">
                                            <a data-control-name="edit_position" data-toggle="modal" data-target="#editExp" id="ember371" onClick={this.expChangeHandler} class="pv-profile-section__edit-action pv-profile-section__hoverable-action ember-view">
                                                <li-icon aria-hidden="true" type="pencil-icon"><svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" preserveAspectRatio="xMinYMin meet" class="artdeco-icon" focusable="false">
                                                    <path d="M21.71,5L19,2.29a1,1,0,0,0-1.41,0L4,15.85,2,22l6.15-2L21.71,6.45A1,1,0,0,0,22,5.71,1,1,0,0,0,21.71,5ZM6.87,18.64l-1.5-1.5L15.92,6.57l1.5,1.5ZM18.09,7.41l-1.5-1.5,1.67-1.67,1.5,1.5Z" class="large-icon" style={{ fill: "currentColor" }}></path>
                                                </svg>
                                                </li-icon>
                                            </a>
                                        </div>
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
                            <div class="modal fade" id="editExp" role="dialog">
                                <div class="modal-dialog">

                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h4 class="modal-title .t-black--light pop-up" >Edit Experience</h4>
                                                </div>
                                                <div className="col-md-6">
                                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-body">
                                            <form name="editExp" style={{ marginTop: "10px" }} onSubmit={this.experienceUpdate}>
                                                <div className="col-md-12 form-group pop-up" style={{ marginTop: "20px" }}>
                                                    <label>Title</label>
                                                    <input type="text" onChange={(e) => this.onExpChangeHandle(e, index)} defaultValue={experience.position} className="form-control" style={{ background: "#ffffff" }} name="title" placeholder="Ex. Manager" required />
                                                </div>

                                                <div className="col-md-12 form-group pop-up">
                                                    <label>Company</label>
                                                    <input type="text" onChange={(e) => this.onExpChangeHandle(e, index)} defaultValue={experience.company} className="form-control" name="company" placeholder="Ex. Microsoft" required />
                                                </div>
                                                <div className="col-md-12 form-group pop-up">
                                                    <label>Location</label>
                                                    <input type="text" onChange={(e) => this.onExpChangeHandle(e, index)} defaultValue={experience.compLocation} className="form-control" name="compLocation" placeholder="Ex.London,United Kingdom" required />
                                                </div>
                                                <div className="col-md-12 form-group pop-up" >
                                                    <div className="col-md-6" style={{ padding: "0px" }}>
                                                        <label>From:</label>
                                                        <select name="cfMonth" onChange={(e) => this.onExpChangeHandle(e, index)} value={experience.from} className="form-control" style={{ width: "100%" }}>
                                                            <option value="month">Month</option>
                                                            <option value="january">January</option>
                                                            <option value="february">February</option>
                                                            <option value="march">March</option>
                                                            <option value="april">April</option>
                                                            <option value="may">May</option>
                                                            <option value="june">June</option>
                                                            <option value="july">July</option>
                                                            <option value="august">August</option>
                                                            <option value="september">September</option>
                                                            <option value="october">October</option>
                                                            <option value="november">November</option>
                                                            <option value="december">December</option>
                                                        </select>
                                                        <select name="cfYear" onChange={(e) => this.onExpChangeHandle(e, index)} value={experience.to} className="form-control" style={{ width: "100%", marginTop: "10px" }}>
                                                            <option value="year">Year</option>
                                                            <option value="1980">1980</option>
                                                            <option value="1981">1981</option>
                                                            <option value="1982">1982</option>
                                                            <option value="1983">1983</option>
                                                            <option value="1984">1984</option>
                                                            <option value="1985">1985</option>
                                                            <option value="1986">1986</option>
                                                            <option value="1987">1987</option>
                                                            <option value="1988">1988</option>
                                                            <option value="1989">1989</option>
                                                            <option value="1990">1990</option>
                                                            <option value="1991">1991</option>
                                                            <option value="1991">1991</option>
                                                            <option value="1993">1993</option>
                                                            <option value="1994">1994</option>
                                                            <option value="1995">1995</option>
                                                            <option value="1996">1996</option>
                                                            <option value="1997">1997</option>
                                                            <option value="1998">1998</option>
                                                            <option value="1999">1999</option>
                                                            <option value="2000">2000</option>
                                                            <option value="2001">2001</option>
                                                            <option value="2002">2002</option>
                                                            <option value="2003">2003</option>
                                                            <option value="2004">2004</option>
                                                            <option value="2005">2005</option>
                                                            <option value="2006">2006</option>
                                                            <option value="2007">2007</option>
                                                            <option value="2008">2008</option>
                                                            <option value="2009">2009</option>
                                                            <option value="2010">2010</option>
                                                            <option value="2011">2011</option>
                                                            <option value="2012">2012</option>
                                                            <option value="2013">2013</option>
                                                            <option value="2014">2014</option>
                                                            <option value="2015">2015</option>
                                                            <option value="2016">2016</option>
                                                            <option value="2017">2017</option>
                                                            <option value="2018">2018</option>
                                                        </select>
                                                    </div>
                                                    {expdropDown}
                                                </div>
                                                <div className="col-md-12 form-group pop-up" style={{ marginTop: "10px" }}>
                                                    <label class="container pop-up">I currently work in this role
                                                    <input type="checkbox" name="check-box" id="check-box" checked={this.state.isWorking} onChange={this.isWorking} />
                                                        <span class="checkmark form-control">
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="col-md-12 form-group pop-up">
                                                    <label>Description</label>
                                                    <textarea className="form-control" onChange={(e) => this.onExpChangeHandle(e, index)} defaultValue={experience.compDescription} name="cDescription" placeholder="Description" rows="8" cols="8" required />
                                                </div>

                                                <div class="modal-footer">
                                                    <input class="btn btn-primary " type="submit" value="Submit" />
                                                    <button type="button" class="btn btn-default" data-dismiss="modal" style={{ border: "1px solid #B8BDBE" }}>Close</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
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
                        <hr style={{ marginLeft: "30px", marginRight: "30px" }} />
                        <ul>
                            <div class="pv-entity__summary-info pv-entity__summary-info--background-section mb2">
                                <div className="row" >
                                    <div className="col-md-10">
                                        <h4 class="t-16 t-black t-bold">{education.school}</h4>
                                    </div>
                                    <div className="col-md-2" style={{ textAlign: "center" }}>
                                        <div class="pv-entity__actions">
                                            <a data-control-name="edit_position" id="ember371" data-toggle="modal" data-target="#editEdu" onClick={this.eduChangeHandler} class="pv-profile-section__edit-action pv-profile-section__hoverable-action ember-view">
                                                <li-icon aria-hidden="true" type="pencil-icon"><svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" preserveAspectRatio="xMinYMin meet" class="artdeco-icon" focusable="false">
                                                    <path d="M21.71,5L19,2.29a1,1,0,0,0-1.41,0L4,15.85,2,22l6.15-2L21.71,6.45A1,1,0,0,0,22,5.71,1,1,0,0,0,21.71,5ZM6.87,18.64l-1.5-1.5L15.92,6.57l1.5,1.5ZM18.09,7.41l-1.5-1.5,1.67-1.67,1.5,1.5Z" class="large-icon" style={{ fill: "currentColor" }}></path>
                                                </svg>
                                                </li-icon>
                                            </a>
                                        </div>
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
                        <div class="modal fade" id="editEdu" role="dialog">
                            <div class="modal-dialog">

                                <div class="modal-content">
                                    <div class="modal-header">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h4 class="modal-title .t-black--light pop-up" >Add Education</h4>
                                            </div>
                                            <div className="col-md-6">
                                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            </div>
                                        </div>
                                        <div class="modal-body">
                                            <form name="editEdu" style={{ marginTop: "10px" }} onSubmit={this.educationUpdate}>
                                                <div className="col-md-12 form-group pop-up" style={{ marginTop: "20px" }}>
                                                    <label>School</label>
                                                    <input type="text" onChange={(e) => this.onEduChangeHandle(e, index)} defaultValue={education.school} className="form-control" style={{ background: "#ffffff" }} name="school" placeholder="Ex. Boston University" required />
                                                </div>

                                                <div className="col-md-12 form-group pop-up">
                                                    <label>Degree</label>
                                                    <input type="text" onChange={(e) => this.onEduChangeHandle(e, index)} defaultValue={education.degree} className="form-control" name="degree" placeholder="Ex. Bachelor's" />
                                                </div>
                                                <div className="col-md-12 form-group pop-up">
                                                    <label>Field of Study</label>
                                                    <input type="text" onChange={(e) => this.onEduChangeHandle(e, index)} defaultValue={education.field} className="form-control" name="field" placeholder="Ex. Business" />
                                                </div>
                                                <div className="col-md-12 form-group pop-up">
                                                    <label>Grade</label>
                                                    <input type="number" onChange={(e) => this.onEduChangeHandle(e, index)} defaultValue={education.grade} className="form-control" name="grade" />
                                                </div>
                                                <div className="col-md-12 form-group pop-up">
                                                    <div className="col-md-5" style={{ padding: "0px" }}>
                                                        <label>From Year</label>
                                                        <select name="efYear" onChange={(e) => this.onEduChangeHandle(e, index)} defaultValue={education.fromYear} className="form-control" style={{ width: "100%" }}>
                                                            <option value="year">Year</option>
                                                            <option value="1980">1980</option>
                                                            <option value="1981">1981</option>
                                                            <option value="1982">1982</option>
                                                            <option value="1983">1983</option>
                                                            <option value="1984">1984</option>
                                                            <option value="1985">1985</option>
                                                            <option value="1986">1986</option>
                                                            <option value="1987">1987</option>
                                                            <option value="1988">1988</option>
                                                            <option value="1989">1989</option>
                                                            <option value="1990">1990</option>
                                                            <option value="1991">1991</option>
                                                            <option value="1991">1991</option>
                                                            <option value="1993">1993</option>
                                                            <option value="1994">1994</option>
                                                            <option value="1995">1995</option>
                                                            <option value="1996">1996</option>
                                                            <option value="1997">1997</option>
                                                            <option value="1998">1998</option>
                                                            <option value="1999">1999</option>
                                                            <option value="2000">2000</option>
                                                            <option value="2001">2001</option>
                                                            <option value="2002">2002</option>
                                                            <option value="2003">2003</option>
                                                            <option value="2004">2004</option>
                                                            <option value="2005">2005</option>
                                                            <option value="2006">2006</option>
                                                            <option value="2007">2007</option>
                                                            <option value="2008">2008</option>
                                                            <option value="2009">2009</option>
                                                            <option value="2010">2010</option>
                                                            <option value="2011">2011</option>
                                                            <option value="2012">2012</option>
                                                            <option value="2013">2013</option>
                                                            <option value="2014">2014</option>
                                                            <option value="2015">2015</option>
                                                            <option value="2016">2016</option>
                                                            <option value="2017">2017</option>
                                                            <option value="2018">2018</option>
                                                        </select>

                                                    </div>
                                                    <div className="col-md-2"></div>
                                                    <div className="col-md-5" style={{ padding: "0px" }}>
                                                        <label>To Year</label>
                                                        <select name="etYear" onChange={(e) => this.onEduChangeHandle(e, index)} defaultValue={education.toYear} className="form-control" style={{ width: "100%" }}>
                                                            <option value="year">Year</option>
                                                            <option value="1980">1980</option>
                                                            <option value="1981">1981</option>
                                                            <option value="1982">1982</option>
                                                            <option value="1983">1983</option>
                                                            <option value="1984">1984</option>
                                                            <option value="1985">1985</option>
                                                            <option value="1986">1986</option>
                                                            <option value="1987">1987</option>
                                                            <option value="1988">1988</option>
                                                            <option value="1989">1989</option>
                                                            <option value="1990">1990</option>
                                                            <option value="1991">1991</option>
                                                            <option value="1991">1991</option>
                                                            <option value="1993">1993</option>
                                                            <option value="1994">1994</option>
                                                            <option value="1995">1995</option>
                                                            <option value="1996">1996</option>
                                                            <option value="1997">1997</option>
                                                            <option value="1998">1998</option>
                                                            <option value="1999">1999</option>
                                                            <option value="2000">2000</option>
                                                            <option value="2001">2001</option>
                                                            <option value="2002">2002</option>
                                                            <option value="2003">2003</option>
                                                            <option value="2004">2004</option>
                                                            <option value="2005">2005</option>
                                                            <option value="2006">2006</option>
                                                            <option value="2007">2007</option>
                                                            <option value="2008">2008</option>
                                                            <option value="2009">2009</option>
                                                            <option value="2010">2010</option>
                                                            <option value="2011">2011</option>
                                                            <option value="2012">2012</option>
                                                            <option value="2013">2013</option>
                                                            <option value="2014">2014</option>
                                                            <option value="2015">2015</option>
                                                            <option value="2016">2016</option>
                                                            <option value="2017">2017</option>
                                                            <option value="2018">2018</option>
                                                        </select>

                                                    </div>
                                                </div>
                                                <div className="col-md-12 form-group pop-up">
                                                    <label>Description</label>
                                                    <textarea className="form-control" onChange={(e) => this.onEduChangeHandle(e, index)} defaultValue={education.eduDescription} name="eDescription" placeholder="Description" rows="8" cols="8" required />
                                                </div>

                                                <div class="modal-footer">
                                                    <input class="btn btn-primary " type="submit" value="Submit" />
                                                    <button type="button" class="btn btn-default" data-dismiss="modal" style={{ border: "1px solid #B8BDBE" }}>Close</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }

        return (
            <div style={{ margin: "auto", maxWidth: "70%", marginTop: "50px" }}>
                <div className="card">
                    <img className="card-img-top" style={{ width: "100%" }} src="http://svgur.com/i/66g.svg" alt="Card image cap" />
                    <div className="pv-top-card-section__profile-photo-container pv-top-card-v2-section__profile-photo-container" >
                        <div className="pv-top-card-v2-section__photo-wrapper pv-top-card-section__photo-wrapper">
                            <div id="ember638" className="pv-top-card-section__edit-photo pv-top-card-v2-section__edit-photo profile-photo-edit ember-view">
                                <button data-control-name="edit_profile_photo" className="profile-photo-edit__edit-btn" data-ember-action="" data-ember-action-639="639" disabled>
                                    <img src={this.state.profilePhoto} className="profile-photo-edit__preview" alt="Edit photo" height="128" width="128" />
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
                    <div class="pv-entity__actions" style={{ textAlign: "right", marginRight: "40px" }}>
                        <a data-control-name="edit_position" data-toggle="modal" data-target="#editProf" id="ember371" class="pv-profile-section__edit-action pv-profile-section__hoverable-action ember-view" >
                            <li-icon aria-hidden="true" type="pencil-icon">
                                <svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" preserveAspectRatio="xMinYMin meet" class="artdeco-icon" focusable="false" style={{ marginTop: "0px" }}>
                                    <path d="M21.71,5L19,2.29a1,1,0,0,0-1.41,0L4,15.85,2,22l6.15-2L21.71,6.45A1,1,0,0,0,22,5.71,1,1,0,0,0,21.71,5ZM6.87,18.64l-1.5-1.5L15.92,6.57l1.5,1.5ZM18.09,7.41l-1.5-1.5,1.67-1.67,1.5,1.5Z" class="large-icon" style={{ fill: "currentColor" }}></path>
                                </svg>
                            </li-icon>
                        </a>
                    </div>
                    <div class="modal fade" id="editProf" role="dialog">
                        <div class="modal-dialog">

                            <div class="modal-content">
                                <div class="modal-header">
                                    <div className="row col-md-12">
                                        <div className="col-md-6" style={{ width: "100%" }}>
                                            <h4 class="modal-title .t-black--light pop-up" >Edit Intro</h4>
                                        </div>
                                        <div className="col-md-6" style={{ width: "100%" }}>
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-body">
                                    <form name="addExp" style={{ marginTop: "10px" }} onSubmit={this.profileUpdate} >
                                        <div className="col-md-12 form-group" style={{ marginTop: "20px" }}>
                                            <div style={{ margin: "auto", textAlign: "center" }}>
                                                <img id="img" alt="Avatar" src={this.state.profilePhoto} style={{ width: "200px", height: "200px", borderRadius: "50%" }}></img>
                                                <input type="file" style={{ textAlign: "center", margin: "auto" }} onChange={this.onImageHandle} name="pic" accept="image/jpg, image/jpeg" />
                                                <input class="btn btn-primary " type="submit" value="Upload" onClick={this.imageUpload} />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="col-md-5 form-group pop-up" style={{ marginTop: "20px", padding: "0px" }}>
                                                <label>First Name</label>
                                                <input type="text" className="form-control" defaultValue={this.state.fName} onChange={this.onChangeHandle} style={{ background: "#ffffff" }} name="fName" placeholder="First Name" required />
                                            </div>
                                            <div className="col-md-2"></div>
                                            <div className="col-md-5 form-group pop-up" style={{ marginTop: "20px", padding: "0px" }}>
                                                <label>Last Name</label>
                                                <input type="text" className="form-control" name="lName" defaultValue={this.state.lName} onChange={this.onChangeHandle} placeholder="Last Name" required />
                                            </div>
                                        </div>
                                        <div className="col-md-12 form-group pop-up">
                                            <label>Headline</label>
                                            <textarea type="text" className="form-control" value={this.state.headline} onChange={this.onChangeHandle} name="headline" rows="3" placeholder="Headline" required />
                                        </div>
                                        <div className="col-md-12 form-group pop-up">
                                            <label>Education</label>
                                            <input type="text" className="form-control" onChange={this.onChangeHandle} defaultValue={this.state.education} name="education" placeholder="Ex. San Jose State University " required />
                                        </div>
                                        <div className="col-md-12">
                                            <div className="col-md-5 form-group pop-up" style={{ marginTop: "20px", padding: "0px" }}>
                                                <label>Country/Region</label>
                                                <input type="text" className="form-control" onChange={this.onChangeHandle} defaultValue={this.state.country} style={{ background: "#ffffff" }} name="country" placeholder="Country" required />
                                            </div>
                                            <div className="col-md-2"></div>
                                            <div className="col-md-5 form-group pop-up" style={{ marginTop: "20px", padding: "0px" }}>
                                                <label>Zip code</label>
                                                <input type="number" className="form-control" onChange={this.onChangeHandle} defaultValue={this.state.zipCode} name="zipCode" placeholder="Zip Code" required />
                                            </div>
                                        </div>
                                        <div className="col-md-12 form-group pop-up">
                                            <label>Location within this area</label>
                                            <input type="text" className="form-control" onChange={this.onChangeHandle} defaultValue={this.state.userLocation} name="userLocation" placeholder="Location" required />
                                        </div>
                                        <div className="col-md-12 form-group pop-up">
                                            <label>Industry</label>
                                            <input type="text" className="form-control" onChange={this.onChangeHandle} defaultValue={this.state.industry} name="industry" placeholder="Ex. Computer Software" required />
                                        </div>
                                        <div className="col-md-12 form-group pop-up">
                                            <label>Phone</label>
                                            <input type="text" className="form-control" onChange={this.onChangeHandle} defaultValue={this.state.phone} name="phone" placeholder="Phone" required />
                                        </div>
                                        <div className="col-md-12 form-group pop-up">
                                            <label>Address</label>
                                            <textarea type="text" className="form-control" onChange={this.onChangeHandle} value={this.state.address} name="address" placeholder="Address" rows="3" required />
                                        </div>
                                        <div className="col-md-12 form-group pop-up">
                                            <label>Summary</label>
                                            <textarea type="text" onChange={this.onChangeHandle} value={this.state.summary} className="form-control" name="summary" placeholder="Summary" rows="7" required />
                                        </div>
                                        <div className="col-md-12 form-group">
                                            <label>Resume</label>
                                            <input type="file" onChange={this.onChangeHandle} className="form-control" defaultValue={this.state.profile.resume} name="resume" accept="resume/pdf" placeholder="Resume" />
                                        </div>
                                        <div class="modal-footer">
                                            <input class="btn btn-primary " type="submit" value="Submit" />
                                            <button type="button" class="btn btn-default" data-dismiss="modal" style={{ border: "1px solid #B8BDBE" }}>Close</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="card-text">
                            <div className="row" style={{ marginTop: "20 px", padding: "40px" }}>
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
                                    {/* <div>
                                            <a data-control-name="contact_see_more" href="/in/aakash-thakkar27/detail/contact-info/" id="ember80" className="pv-top-card-v2-section__link pv-top-card-v2-section__link--contact-info mb1 ember-view">
                                                <div className="col-md-12" >
                                                    <div className="col-md-2" style={{ padding: "0px", textAlign: "right" }}>
                                                        <span className="svg-icon-wrap">
                                                            <li-icon aria-hidden="true" type="address-book-icon" className="pv-top-card-v2-section__icon mh1" size="medium">
                                                                <svg viewBox="0 0 24 24" width="24" height="24" x="0" y="0" preserveAspectRatio="xMinYMin meet" focusable="false">
                                                                    <path d="M16,15H10a3.24,3.24,0,0,1,1.79-2.89L12,12h2l0.21,0.11A3.24,3.24,0,0,1,16,15ZM13,8h0a2,2,0,0,0-2,2h0a2,2,0,0,0,2,2h0a2,2,0,0,0,2-2h0A2,2,0,0,0,13,8Zm8-4V20a2,2,0,0,1-2,2H5V19H3V17H5V13H3V11H5V7H3V5H5V2H19A2,2,0,0,1,21,4ZM19,4H7V20H19V4Z" className="large-icon" style={{ fill: "currentColor" }}>
                                                                    </path>
                                                                </svg>
                                                            </li-icon>
                                                        </span>
                                                    </div>
                                                    <div className="col-md-10" style={{ padding: "0px" }}>
                                                        <span className="pv-top-card-v2-section__entity-name pv-top-card-v2-section__connections ml2 t-14 user-prof t-bold">
                                                            See contact info
                                                         </span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div> */}
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
                                <hr style={{ marginLeft: "30px", marginRight: "30px" }} />
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
                            <div className="row">
                                <div className="col-md-10">
                                    <h3 className="experience-black " >
                                        Experience
                                        </h3>
                                </div>
                                <div className="col-md-2" style={{ marginTop: "30px", marginRight: "0px", textAlign: "center" }}>
                                    <a data-control-name="add_position" id="ember370" data-toggle="modal" onClick={this.expAddHandler} data-target="#addExp" className="pv-profile-section__header-add-action add-position ember-view">
                                        <span className="svg-icon-wrap">
                                            <li-icon aria-hidden="true" type="plus-icon">
                                                <svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" preserveAspectRatio="xMinYMin meet" className="artdeco-icon" focusable="false">
                                                    <path d="M21,13H13v8H11V13H3V11h8V3h2v8h8v2Z" className="large-icon" style={{ fill: "currentColor" }}>
                                                    </path>
                                                </svg>
                                            </li-icon>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </header>
                        {experiences}
                    </div>
                </div>

                <div class="modal fade" id="addExp" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-header">
                                <div className="row col-md-12">
                                    <div className="col-md-6">
                                        <h4 class="modal-title .t-black--light pop-up" >Add Experience</h4>
                                    </div>
                                    <div className="col-md-6">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-body">
                                <form name="addExp" style={{ marginTop: "10px" }} onSubmit={this.experienceUpdate}>
                                    <div className="col-md-12 form-group pop-up" style={{ marginTop: "20px" }}>
                                        <label>Title</label>
                                        <input type="text" onChange={this.onChangeHandle} className="form-control" style={{ background: "#ffffff" }} name="title" placeholder="Ex. Manager" required />
                                    </div>

                                    <div className="col-md-12 form-group pop-up">
                                        <label>Company</label>
                                        <input type="text" onChange={this.onChangeHandle} className="form-control" name="company" placeholder="Ex. Microsoft" required />
                                    </div>
                                    <div className="col-md-12 form-group pop-up">
                                        <label>Location</label>
                                        <input type="text" onChange={this.onChangeHandle} className="form-control" name="compLocation" placeholder="Ex.London,United Kingdom" required />
                                    </div>
                                    <div className="col-md-12 form-group pop-up" >
                                        <div className="col-md-6" style={{ padding: "0px" }}>
                                            <label>From:</label>
                                            <select name="cfMonth" onChange={this.onChangeHandle} className="form-control" style={{ width: "100%" }}>
                                                <option value="month">Month</option>
                                                <option value="january">January</option>
                                                <option value="february">February</option>
                                                <option value="march">March</option>
                                                <option value="april">April</option>
                                                <option value="may">May</option>
                                                <option value="june">June</option>
                                                <option value="july">July</option>
                                                <option value="august">August</option>
                                                <option value="september">September</option>
                                                <option value="october">October</option>
                                                <option value="november">November</option>
                                                <option value="december">December</option>
                                            </select>
                                            <select name="cfYear" onChange={this.onChangeHandle} className="form-control" style={{ width: "100%", marginTop: "10px" }}>
                                                <option value="year">Year</option>
                                                <option value="1980">1980</option>
                                                <option value="1981">1981</option>
                                                <option value="1982">1982</option>
                                                <option value="1983">1983</option>
                                                <option value="1984">1984</option>
                                                <option value="1985">1985</option>
                                                <option value="1986">1986</option>
                                                <option value="1987">1987</option>
                                                <option value="1988">1988</option>
                                                <option value="1989">1989</option>
                                                <option value="1990">1990</option>
                                                <option value="1991">1991</option>
                                                <option value="1991">1991</option>
                                                <option value="1993">1993</option>
                                                <option value="1994">1994</option>
                                                <option value="1995">1995</option>
                                                <option value="1996">1996</option>
                                                <option value="1997">1997</option>
                                                <option value="1998">1998</option>
                                                <option value="1999">1999</option>
                                                <option value="2000">2000</option>
                                                <option value="2001">2001</option>
                                                <option value="2002">2002</option>
                                                <option value="2003">2003</option>
                                                <option value="2004">2004</option>
                                                <option value="2005">2005</option>
                                                <option value="2006">2006</option>
                                                <option value="2007">2007</option>
                                                <option value="2008">2008</option>
                                                <option value="2009">2009</option>
                                                <option value="2010">2010</option>
                                                <option value="2011">2011</option>
                                                <option value="2012">2012</option>
                                                <option value="2013">2013</option>
                                                <option value="2014">2014</option>
                                                <option value="2015">2015</option>
                                                <option value="2016">2016</option>
                                                <option value="2017">2017</option>
                                                <option value="2018">2018</option>
                                            </select>
                                        </div>
                                        {expdropDown}
                                    </div>
                                    <div className="col-md-12 form-group pop-up" style={{ marginTop: "10px" }}>
                                        <label class="container pop-up">I currently work in this role
                                                    <input type="checkbox" name="check-box" id="check-box" checked={this.state.isWorking} onChange={this.isWorking} />
                                            <span class="checkmark form-control">
                                            </span>
                                        </label>
                                    </div>
                                    <div className="col-md-12 form-group pop-up">
                                        <label>Description</label>
                                        <textarea className="form-control" onChange={this.onChangeHandle} name="cDescription" placeholder="Description" rows="8" cols="8" required />
                                    </div>

                                    <div class="modal-footer">
                                        <input class="btn btn-primary " type="submit" value="Submit" />
                                        <button type="button" class="btn btn-default" data-dismiss="modal" style={{ border: "1px solid #B8BDBE" }}>Close</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card" >
                    <div className="card-body">
                        <header className="pv-profile-section__card-header">
                            <div className="row">
                                <div className="col-md-10">
                                    <h3 className="experience-black " >
                                        Education
                                        </h3>
                                </div>
                                <div className="col-md-2" style={{ marginTop: "30px", marginRight: "0px", textAlign: "center" }}>
                                    <a data-control-name="add_position" id="ember370" data-toggle="modal" onClick={this.eduAddHandler} data-target="#addEdu" className="pv-profile-section__header-add-action add-position ember-view">
                                        <span className="svg-icon-wrap">
                                            <li-icon aria-hidden="true" type="plus-icon">
                                                <svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" preserveAspectRatio="xMinYMin meet" className="artdeco-icon" focusable="false">
                                                    <path d="M21,13H13v8H11V13H3V11h8V3h2v8h8v2Z" className="large-icon" style={{ fill: "currentColor" }}>
                                                    </path>
                                                </svg>
                                            </li-icon>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </header>
                        {educations}
                    </div>
                </div>

                <div class="modal fade" id="addEdu" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-header">
                                <div className="row col-md-12">
                                    <div className="col-md-6">
                                        <h4 class="modal-title .t-black--light pop-up" >Add Education</h4>
                                    </div>
                                    <div className="col-md-6">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-body">
                                <form name="addEdu" style={{ marginTop: "10px" }} onSubmit={this.educationUpdate}>
                                    <div className="col-md-12 form-group pop-up" style={{ marginTop: "20px" }}>
                                        <label>School</label>
                                        <input type="text" onChange={this.onChangeHandle} className="form-control" style={{ background: "#ffffff" }} name="school" placeholder="Ex. Boston University" required />
                                    </div>

                                    <div className="col-md-12 form-group pop-up">
                                        <label>Degree</label>
                                        <input type="text" onChange={this.onChangeHandle} className="form-control" name="degree" placeholder="Ex. Bachelor's" />
                                    </div>
                                    <div className="col-md-12 form-group pop-up">
                                        <label>Field of Study</label>
                                        <input type="text" onChange={this.onChangeHandle} className="form-control" name="field" placeholder="Ex. Business" />
                                    </div>
                                    <div className="col-md-12 form-group pop-up">
                                        <label>Grade</label>
                                        <input type="number" onChange={this.onChangeHandle} className="form-control" name="grade" />
                                    </div>
                                    <div className="col-md-12 form-group pop-up">
                                        <div className="col-md-5" style={{ padding: "0px" }}>
                                            <label>From Year</label>
                                            <select name="efYear" onChange={this.onChangeHandle} className="form-control" style={{ width: "100%" }}>
                                                <option value="year">Year</option>
                                                <option value="1980">1980</option>
                                                <option value="1981">1981</option>
                                                <option value="1982">1982</option>
                                                <option value="1983">1983</option>
                                                <option value="1984">1984</option>
                                                <option value="1985">1985</option>
                                                <option value="1986">1986</option>
                                                <option value="1987">1987</option>
                                                <option value="1988">1988</option>
                                                <option value="1989">1989</option>
                                                <option value="1990">1990</option>
                                                <option value="1991">1991</option>
                                                <option value="1991">1991</option>
                                                <option value="1993">1993</option>
                                                <option value="1994">1994</option>
                                                <option value="1995">1995</option>
                                                <option value="1996">1996</option>
                                                <option value="1997">1997</option>
                                                <option value="1998">1998</option>
                                                <option value="1999">1999</option>
                                                <option value="2000">2000</option>
                                                <option value="2001">2001</option>
                                                <option value="2002">2002</option>
                                                <option value="2003">2003</option>
                                                <option value="2004">2004</option>
                                                <option value="2005">2005</option>
                                                <option value="2006">2006</option>
                                                <option value="2007">2007</option>
                                                <option value="2008">2008</option>
                                                <option value="2009">2009</option>
                                                <option value="2010">2010</option>
                                                <option value="2011">2011</option>
                                                <option value="2012">2012</option>
                                                <option value="2013">2013</option>
                                                <option value="2014">2014</option>
                                                <option value="2015">2015</option>
                                                <option value="2016">2016</option>
                                                <option value="2017">2017</option>
                                                <option value="2018">2018</option>
                                            </select>

                                        </div>
                                        <div className="col-md-2"></div>
                                        <div className="col-md-5" style={{ padding: "0px" }}>
                                            <label>To Year</label>
                                            <select name="etYear" onChange={this.onChangeHandle} className="form-control" style={{ width: "100%" }}>
                                                <option value="year">Year</option>
                                                <option value="1980">1980</option>
                                                <option value="1981">1981</option>
                                                <option value="1982">1982</option>
                                                <option value="1983">1983</option>
                                                <option value="1984">1984</option>
                                                <option value="1985">1985</option>
                                                <option value="1986">1986</option>
                                                <option value="1987">1987</option>
                                                <option value="1988">1988</option>
                                                <option value="1989">1989</option>
                                                <option value="1990">1990</option>
                                                <option value="1991">1991</option>
                                                <option value="1991">1991</option>
                                                <option value="1993">1993</option>
                                                <option value="1994">1994</option>
                                                <option value="1995">1995</option>
                                                <option value="1996">1996</option>
                                                <option value="1997">1997</option>
                                                <option value="1998">1998</option>
                                                <option value="1999">1999</option>
                                                <option value="2000">2000</option>
                                                <option value="2001">2001</option>
                                                <option value="2002">2002</option>
                                                <option value="2003">2003</option>
                                                <option value="2004">2004</option>
                                                <option value="2005">2005</option>
                                                <option value="2006">2006</option>
                                                <option value="2007">2007</option>
                                                <option value="2008">2008</option>
                                                <option value="2009">2009</option>
                                                <option value="2010">2010</option>
                                                <option value="2011">2011</option>
                                                <option value="2012">2012</option>
                                                <option value="2013">2013</option>
                                                <option value="2014">2014</option>
                                                <option value="2015">2015</option>
                                                <option value="2016">2016</option>
                                                <option value="2017">2017</option>
                                                <option value="2018">2018</option>
                                            </select>

                                        </div>
                                    </div>
                                    <div className="col-md-12 form-group pop-up">
                                        <label>Description</label>
                                        <textarea className="form-control" onChange={this.onChangeHandle} name="eDescription" placeholder="Description" rows="8" cols="8" required />
                                    </div>

                                    <div class="modal-footer">
                                        <input class="btn btn-primary " type="submit" value="Submit" />
                                        <button type="button" class="btn btn-default" data-dismiss="modal" style={{ border: "1px solid #B8BDBE" }}>Close</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <header className="pv-profile-section__card-header">
                            <div className="row">
                                <div className="col-md-9">
                                    <h3 className="experience-black " >
                                        Skills
                                        </h3>
                                </div>
                                <div className="col-md-2" style={{ marginTop: "30px" }}>
                                    <a data-control-name="add_position" style={{ color: "#676767", cursor: "pointer" }} id="ember370" data-toggle="modal" data-target="#addSkill" className="pv-profile-section__header-add-action add-position ember-view">
                                        Add a new skill
                                        </a>
                                </div>
                                <div className="col-md-1" style={{ marginLeft: "0px", marginTop: "30px" }}>
                                    <a data-control-name="edit_position" data-toggle="modal" data-target="#editSkill" id="ember371" class="pv-profile-section__edit-action pv-profile-section__hoverable-action ember-view">
                                        <li-icon aria-hidden="true" type="pencil-icon"><svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" preserveAspectRatio="xMinYMin meet" class="artdeco-icon" focusable="false">
                                            <path d="M21.71,5L19,2.29a1,1,0,0,0-1.41,0L4,15.85,2,22l6.15-2L21.71,6.45A1,1,0,0,0,22,5.71,1,1,0,0,0,21.71,5ZM6.87,18.64l-1.5-1.5L15.92,6.57l1.5,1.5ZM18.09,7.41l-1.5-1.5,1.67-1.67,1.5,1.5Z" class="large-icon" style={{ fill: "currentColor" }}></path>
                                        </svg>
                                        </li-icon>
                                    </a>
                                </div>
                            </div>
                        </header>
                        <ul>
                            <div class="pv-entity__summary-info pv-entity__summary-info--background-section mb2">
                                <div className="row" >
                                    <div>
                                        <hr style={{ marginLeft: "30px", marginRight: "30px" }} />
                                        {skills}
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
                <div class="modal fade" id="addSkill" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-header">
                                <div className="row col-md-12">
                                    <div className="col-md-6">
                                        <h4 class="modal-title .t-black--light pop-up" >Add Skills</h4>
                                    </div>
                                    <div className="col-md-6">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-body">
                                <form className="form" style={{ marginTop: "10px" }} onSubmit={this.skillUpdate}>
                                    <div className="col-md-12 form-group pop-up" style={{ marginTop: "20px" }}>
                                        <label for="skills">Skills</label>
                                        <Typeahead
                                            labelKey="name"
                                            allowNew
                                            multiple
                                            newSelectionPrefix="Add a new item: "
                                            options={[]}
                                            onChange={this.onChangeSkillsFunction}
                                            name="skills"
                                            placeholder="Skill (ex: Data Analysis)"
                                            selected={this.state.skills}
                                        />
                                    </div>
                                    <div class="modal-footer">
                                        <input class="btn btn-primary " type="submit" value="Add" />
                                        <button type="button" class="btn btn-default" data-dismiss="modal" style={{ border: "1px solid #B8BDBE" }}>Close</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal fade" id="editSkill" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-header">
                                <div className="row col-md-12">
                                    <div className="col-md-6">
                                        <h4 class="modal-title .t-black--light pop-up" >Add Skills</h4>
                                    </div>
                                    <div className="col-md-6">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-body">
                                <form className="form" style={{ marginTop: "10px" }} onSubmit={this.skillUpdate}>
                                    <div className="col-md-12 form-group pop-up" style={{ marginTop: "20px" }}>
                                        <label for="skills">Skills</label>
                                        <Typeahead
                                            labelKey="name"
                                            allowNew
                                            multiple
                                            newSelectionPrefix="Add a new item: "
                                            options={[]}
                                            onChange={this.onChangeSkillsFunction}
                                            name="skills"
                                            value={this.state.profile.skills}
                                            placeholder="Skill (ex: Data Analysis)"
                                            selected={this.state.skills}
                                        />
                                    </div>
                                    <div class="modal-footer">
                                        <input class="btn btn-primary " type="submit" value="Add" />
                                        <button type="button" class="btn btn-default" data-dismiss="modal" style={{ border: "1px solid #B8BDBE" }}>Close</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default Profile;