import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';

class Profile extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-12" style={{ padding: "0px 0px 80px 0px" }}>
                <div className="col-md-8 " style={{ padding: "60px" }}>
                    <div className="card" style={{ width: "50rem" }}>
                        <img className="card-img-top" style={{ width: "100%" }} src="http://svgur.com/i/66g.svg" alt="Card image cap" />
                        <div className="pv-top-card-section__profile-photo-container pv-top-card-v2-section__profile-photo-container" >
                            <div className="pv-top-card-v2-section__photo-wrapper pv-top-card-section__photo-wrapper">
                                <div id="ember638" className="pv-top-card-section__edit-photo pv-top-card-v2-section__edit-photo profile-photo-edit ember-view">
                                    <button data-control-name="edit_profile_photo" className="profile-photo-edit__edit-btn" data-ember-action="" data-ember-action-639="639">
                                        <img src="https://media.licdn.com/dms/image/C5103AQFY76yHBmz70Q/profile-displayphoto-shrink_200_200/0?e=1548288000&amp;v=beta&amp;t=BHOKrXquvMnoAcK0Oc11gI9r0DdWUOTyTAGz27rXsac" className="profile-photo-edit__preview" alt="Edit photo" height="128" width="128" />
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
                                <div className="row" style={{ marginTop: "20 px", padding: "40px" }}>
                                    <div className="col-md-8" style={{ padding: "0px" }}>
                                        <div>
                                            <h3>
                                                Aakash Thakkar
                                            </h3>
                                        </div>
                                        <div>
                                            <span>
                                                Graduate Student at San Jose State University
                                            </span>
                                        </div>
                                        <span className = "text-muted">
                                            San Jose, California
                                        </span>
                                    </div>

                                    <div className="col-md-4" style={{ padding: "0px" }}>
                                        <div className="col-md-12" >
                                            <div className="col-md-2" style={{ padding: "0px", textAlign: "right" }}>
                                            </div>

                                            <div className="col-md-10" style={{ padding: "0px" }}>
                                                <button href="#education-section" data-control-name="education_see_more" className="pv-top-card-v2-section__link pv-top-card-v2-section__link-education mb1" data-ember-action="" style={{ marginBottom: "8px" }} data-ember-action-77="77">
                                                    <span id="ember79" className="pv-top-card-v2-section__entity-name pv-top-card-v2-section__school-name text-align-left ml2 t-14 t-black t-bold lt-line-clamp lt-line-clamp--multi-line ember-view" style={{ WebkitLineClamp: "2" }}>  San Jose State University
                                                    </span>
                                                </button>
                                            </div>
                                        </div>

                                        <div>
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
                                                        <span className="pv-top-card-v2-section__entity-name pv-top-card-v2-section__connections ml2 t-14 t-black t-bold">
                                                            See contact info
                                                         </span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div>
                                            <a data-control-name="topcard_view_all_connections" href="/search/results/people/?facetNetwork=%5B%22F%22%5D&amp;origin=MEMBER_PROFILE_CANNED_SEARCH" id="ember81" className="pv-top-card-v2-section__link pv-top-card-v2-section__link--connections ember-view">
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
                                                        <span className="pv-top-card-v2-section__entity-name pv-top-card-v2-section__connections ml2 t-14 t-black t-bold">
                                                            See connections (107)
                                                    </span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card" style= {{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="card-link">Card link</a>
                            <a href="#" className="card-link">Another link</a>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
export default Profile;