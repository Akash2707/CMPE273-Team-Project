import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import "../../cssFiles/nav.css"
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDownOpen: false,
        }

        this.dropDownHandler  = this.dropDownHandler.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    dropDownHandler () {
        if(this.state.dropDownOpen == false){
        this.setState({
            dropDownOpen : true,
            
        })
    }else{
        this.setState({
            dropDownOpen : false,
            
        })
    }
    }

    handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('id')
        localStorage.removeItem('isRecruiter')
        let detailPage = null
        detailPage = this.props.history.push({
            pathname: "/login",
            state: {
            }
        })
    }

    render() {
        let homeClass = null;
        let networkClass = null;
        let jobsClass = null;
        let messageClass = null;
        let dropDownClass = null;
        let expanded = null;
        let navigationBar = null
        
        console.log(this.props.location.pathname);
        if (this.props.location.pathname == "/feed/") {
            homeClass = "nav-item__link nav-item__link--underline js-nav-item-link active"
        } else {
            homeClass = "nav-item__link nav-item__link--underline js-nav-item-link "
        }
        if (this.props.location.pathname == "/mynetwork/") {
            networkClass = "nav-item__link nav-item__link--underline js-nav-item-link active"
        } else {
            networkClass = "nav-item__link nav-item__link--underline js-nav-item-link "
        }
        if (this.props.location.pathname == "/jobs/") {
            jobsClass = "nav-item__link nav-item__link--underline js-nav-item-link active"
        } else {
            jobsClass = "nav-item__link nav-item__link--underline js-nav-item-link "
        }
        if (this.props.location.pathname == "/messaging/") {
            messageClass = "nav-item__link nav-item__link--underline js-nav-item-link active"
        } else {
            messageClass = "nav-item__link nav-item__link--underline js-nav-item-link "
        }
    
        if(this.state.dropDownOpen == true) {
            dropDownClass = "dropdown open dropdown"
            expanded = "true"
            console.log("if" + dropDownClass)
        }else if(this.state.dropDownOpen == false ){
            console.log("else if");
            dropDownClass = "dropdown closed dropdown"
            expanded = "false"    
        }

        if(localStorage.getItem("token") != null){
            navigationBar = (
                <nav id="extended-nav" className="extended-nav nav-main-container" role="banner" tabIndex="-1" style={{ display: "block" }}>
                <div className="nav-main__content full-height display-flex align-items-center">
                    <div class="nav-main__inbug-container fl mr3">
                        <div id="inbug-nav-item" class="nav-item--inbug" lang="en">
                            <a href="/jobs/search/" data-alias="" data-link-to="feed" data-resource="feed/badge" data-control-name="" class = "nav-item__link js-nav-item-link active">
                                <span class="nav-item__icon nav-item__icon--inbug" lang="en" aria-role="presentation">
                                    <li-icon aria-hidden="true" type="linkedin-bug" size="34dp" color="brand">
                                        <svg preserveAspectRatio="xMinYMin meet" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                            <g class="scaling-icon" style={{ fillOpacity: "1" }}><defs></defs>
                                                <g class="bug-34dp" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g class="dp-1"><path d="M2.8,34 L31.2,34 C32.746,34 34,32.746 34,31.2 L34,2.8 C34,1.254 32.746,0 31.2,0 L2.8,0 C1.254,0 0,1.254 0,2.8 L0,31.2 C0,32.746 1.254,34 2.8,34" class="bug-text-color" fill="#FFFFFF"></path><path d="M2.8,34 L31.2,34 C32.746,34 34,32.746 34,31.2 L34,2.8 C34,1.254 32.746,0 31.2,0 L2.8,0 C1.254,0 0,1.254 0,2.8 L0,31.2 C0,32.746 1.254,34 2.8,34 Z M13,13 L17.75,13 L17.75,15.391 C18.387,14.114 20.242,12.75 22.695,12.75 C27.397,12.75 29,14.875 29,19.922 L29,29 L24,29 L24,20.984 C24,18.328 23.481,16.875 21.542,16.875 C18.921,16.875 18,18.867 18,20.984 L18,29 L13,29 L13,13 Z M5,29 L10,29 L10,13 L5,13 L5,29 Z M10.55,7.5 C10.55,9.184 9.184,10.55 7.5,10.55 C5.816,10.55 4.45,9.184 4.45,7.5 C4.45,5.815 5.816,4.45 7.5,4.45 C9.184,4.45 10.55,5.815 10.55,7.5 Z" class="background" fill="#0077B5"></path></g>
                                                    <g class="dpi-gt1" transform="scale(0.7083)"><rect class="bug-text-color" fill="#FFFFFF" x="1" y="1" width="46" height="46" rx="4"></rect><path d="M0,4.00989318 C0,1.79529033 1.79405245,0 4.00989318,0 L43.9901068,0 C46.2047097,0 48,1.79405245 48,4.00989318 L48,43.9901068 C48,46.2047097 46.2059475,48 43.9901068,48 L4.00989318,48 C1.79529033,48 0,46.2059475 0,43.9901068 L0,4.00989318 Z M19,18.3 L25.5,18.3 L25.5,21.566 C26.437,19.688 28.838,18 32.445,18 C39.359,18 41,21.738 41,28.597 L41,41.3 L34,41.3 L34,30.159 C34,26.253 33.063,24.05 30.68,24.05 C27.375,24.05 26,26.425 26,30.159 L26,41.3 L19,41.3 L19,18.3 Z M7,41 L14,41 L14,18 L7,18 L7,41 Z M15,10.5 C15,12.985 12.985,15 10.5,15 C8.015,15 6,12.985 6,10.5 C6,8.015 8.015,6 10.5,6 C12.985,6 15,8.015 15,10.5 Z" class="background" fill="#0077B5"></path></g></g>
                                            </g>
                                        </svg>
                                    </li-icon>
                                </span>
                            </a>
                        </div>
                    </div>
                    <ul className="nav-main nav-container display-flex full-height" role="navigation" aria-label="Primary">
                        <li id="mynetwork-nav-item" class="nav-item nav-item--mynetwork" style={{ opacity: "1" }} lang="en">
                            <a href="/Mynetwork/" data-alias="relationships" data-link-to="mynetwork" data-resource="voyagerCommunicationsTabBadges" data-control-name="" class={networkClass}>
                                <span id="mynetwork-tab-icon" class="nav-item__icon" lang="en" aria-role="presentation">
                                    <li-icon aria-hidden="true" type="nav-small-people-icon" color="true">
                                        <svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" preserveAspectRatio="xMinYMin meet" class="nav-icon" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16,17.85V20a1,1,0,0,1-1,1H1a1,1,0,0,1-1-1V17.85a4,4,0,0,1,2.55-3.73l2.95-1.2V11.71l-0.73-1.3A6,6,0,0,1,4,7.47V6a4,4,0,0,1,4.39-4A4.12,4.12,0,0,1,12,6.21V7.47a6,6,0,0,1-.77,2.94l-0.73,1.3v1.21l2.95,1.2A4,4,0,0,1,16,17.85Zm4.75-3.65L19,13.53v-1a6,6,0,0,0,1-3.31V9a3,3,0,0,0-6,0V9.18a6,6,0,0,0,.61,2.58A3.61,3.61,0,0,0,16,13a3.62,3.62,0,0,1,2,3.24V21h4a1,1,0,0,0,1-1V17.47A3.5,3.5,0,0,0,20.75,14.2Z" class="active-item" style={{ fillOpacity: "1" }}></path>
                                            <path d="M20.74,14.2L19,13.54V12.86l0.25-.41A5,5,0,0,0,20,9.82V9a3,3,0,0,0-6,0V9.82a5,5,0,0,0,.75,2.63L15,12.86v0.68l-1,.37a4,4,0,0,0-.58-0.28l-2.45-1V10.83A8,8,0,0,0,12,7V6A4,4,0,0,0,4,6V7a8,8,0,0,0,1,3.86v1.84l-2.45,1A4,4,0,0,0,0,17.35V20a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1V17.47A3.5,3.5,0,0,0,20.74,14.2ZM16,8.75a1,1,0,0,1,2,0v1.44a3,3,0,0,1-.38,1.46l-0.33.6a0.25,0.25,0,0,1-.22.13H16.93a0.25,0.25,0,0,1-.22-0.13l-0.33-.6A3,3,0,0,1,16,10.19V8.75ZM6,5.85a2,2,0,0,1,4,0V7.28a6,6,0,0,1-.71,2.83L9,10.72a1,1,0,0,1-.88.53H7.92A1,1,0,0,1,7,10.72l-0.33-.61A6,6,0,0,1,6,7.28V5.85ZM14,19H2V17.25a2,2,0,0,1,1.26-1.86L7,13.92v-1a3,3,0,0,0,1,.18H8a3,3,0,0,0,1-.18v1l3.72,1.42A2,2,0,0,1,14,17.21V19Zm7,0H16V17.35a4,4,0,0,0-.55-2l1.05-.4V14.07a2,2,0,0,0,.4.05h0.2a2,2,0,0,0,.4-0.05v0.88l2.53,1a1.5,1.5,0,0,1,1,1.4V19Z" class="inactive-item" style={{ fill: "currentColor" }}></path>
                                        </svg>
                                    </li-icon>
                                </span>
                                <span class="nav-item__title">My Network</span>
                            </a>
                        </li>
                        <li id="jobs-nav-item" class="nav-item nav-item--jobs" style={{ opacity: "1" }} lang="en">
                            <a href="/jobs/" data-alias="" data-link-to="jobs" data-resource="" data-control-name="" class={jobsClass}>
                                <span id="jobs-tab-icon" class="nav-item__icon" lang="en" aria-role="presentation"><li-icon aria-hidden="true" type="nav-small-jobs-icon" color="true">
                                    <svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" preserveAspectRatio="xMinYMin meet" class="nav-icon" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2,13H22v6a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V13ZM22,8v4H2V8A1,1,0,0,1,3,7H7V6a3,3,0,0,1,3-3h4a3,3,0,0,1,3,3V7h4A1,1,0,0,1,22,8ZM15,6a1,1,0,0,0-1-1H10A1,1,0,0,0,9,6V7h6V6Z" class="active-item" style={{ fillOpacity: "1" }}></path>
                                        <path d="M21,7H17V6a3,3,0,0,0-3-3H10A3,3,0,0,0,7,6V7H3A1,1,0,0,0,2,8V19a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V8A1,1,0,0,0,21,7ZM9,6a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1V7H9V6ZM20,18H4V13H20v5Zm0-6H4V9H20v3Z" class="inactive-item" style={{ fill: "currentColor" }}></path>
                                    </svg></li-icon></span>
                                <span class="nav-item__title">Jobs</span>
                            </a>
                        </li>
                        <li id="messaging-nav-item" class="nav-item nav-item--messaging" style={{ opacity: "1" }} lang="en">
                            <a href="/messaging/" data-alias="" data-link-to="messaging" data-resource="voyagerCommunicationsTabBadges" data-control-name="" class={messageClass}>
                                <span id="messaging-tab-icon" class="nav-item__icon" lang="en" aria-role="presentation">
                                    <li-icon aria-hidden="true" type="nav-small-messaging-icon" color="true">
                                        <svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" preserveAspectRatio="xMinYMin meet" class="nav-icon" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21,9H8a1,1,0,0,0-1,1V20a1,1,0,0,0,1,1H18l4,3V10A1,1,0,0,0,21,9Zm-4,8H12V16h5v1Zm1-3H11V13h7v1ZM17,5V7H6A1,1,0,0,0,5,8v8H3a1,1,0,0,1-1-1V5A1,1,0,0,1,3,4H16A1,1,0,0,1,17,5Z" class="active-item" style={{ fillOpacity: "1" }}></path>
                                            <path d="M21,8H8A1,1,0,0,0,7,9V19a1,1,0,0,0,1,1H18l4,3V9A1,1,0,0,0,21,8ZM20,19.11L18.52,18H9V10H20v9.11ZM12,15h5v1H12V15ZM4,13H5v2H3a1,1,0,0,1-1-1V4A1,1,0,0,1,3,3H16a1,1,0,0,1,1,1V6H15V5H4v8Zm14,0H11V12h7v1Z" class="inactive-item" style={{ fill: "currentColor" }}></path>
                                        </svg></li-icon></span>
                                <span class="nav-item__title">Messaging</span>
                            </a>
                        </li>
                        <li id="profile-nav-item" class="nav-item nav-item--profile" style={{ opacity: "1" }} lang="en">
                            <div id="nav-settings__dropdown" class={dropDownClass}>
                                <button data-control-name="nav.settings" style= {{outlineColor : "transparent"}} aria-controls="nav-settings__dropdown-options" onClick = {this.dropDownHandler} aria-expanded={expanded} id="nav-settings__dropdown-trigger" class="t-14 t-black--light t-bold nav-item__link dropdown-trigger ember-view" type="button" data-toggle = "dropdown">
                                    <img src="https://media.licdn.com/dms/image/C5103AQFY76yHBmz70Q/profile-displayphoto-shrink_100_100/0?e=1548288000&amp;v=beta&amp;t=doXqRRdC4IVu-a1fFF93cj7_5GfKU0ZsV2PuY42byxc" class="nav-item__profile-member-photo nav-item__icon" alt="Aakash Thakkar" height="24" width="24" />
                                    <div class="nav-item__title-container">
                                        <span class="nav-item__title nav-item__dropdown-trigger--title ">Me</span>
                                        <span class="nav-item__dropdown-trigger--icon svg-icon-wrap" >
                                            <li-icon aria-hidden="true" type="caret-filled-down-icon" size="small">
                                                <svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" style={{ opacity: "1" }} preserveAspectRatio="xMinYMin meet" class="artdeco-icon" focusable="false">
                                                    <path d="M8.8,10.66L14,5.12A0.07,0.07,0,0,0,13.93,5H2.07A0.07,0.07,0,0,0,2,5.12L7.2,10.66A1.1,1.1,0,0,0,8.8,10.66Z" class="small-icon" style={{ fillOpacity: "1" }}></path>
                                                </svg>
                                            </li-icon>
                                        </span>
                                    </div>
                                </button>


                                <ul id="nav-settings__dropdown-options" class="dropdown-options nav-settings__dropdown-options  dropdown-menu" data-artdeco-is-focused = "true">
                                    <li class="nav-settings__topcard nav-settings__no-hover">
                                        <a data-control-name="nav.settings_view_profile" style = {{padding : "0px" , whiteSpace : "normal"}} href="/in/aakash-thakkar27/"  >
                                            <div class="nav-settings__member nav-settings__block">
                                                <div class="nav-settings__member-photo-container">
                                                    <img src="https://media.licdn.com/dms/image/C5103AQFY76yHBmz70Q/profile-displayphoto-shrink_100_100/0?e=1548288000&amp;v=beta&amp;t=doXqRRdC4IVu-a1fFF93cj7_5GfKU0ZsV2PuY42byxc" class="nav-settings__member-photo EntityPhoto-circle-4" alt="Aakash Thakkar" height="70" width="70" />
                                                </div>
                                                <div class="nav-settings__member-info-container">
                                                    <h3 class="nav-settings__member-name t-16 t-black t-bold" style={{fontSize: "80%"}}>
                                                        Aakash Thakkar
                                                    </h3>
                                                    <h4 class="nav-settings__member-occupation t-14 t-black--light t-normal" style={{fontSize: "80%"}}>
                                                        Graduate Student at San Jose State University
                                                    </h4>
                                                </div>
                                            </div>
                                            <div class="nav-settings__linkcard nav-settings__block" style={{fontSize: "80%"}}>
                                                <span class="nav-settings__linkcard-link button-tertiary-medium">
                                                    View profile
                                                </span>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="nav-settings__dropdown-options--actions nav-settings__no-hover">
                                        <ul class="nav-settings__dropdown-items">
                                            <li class="nav-dropdown__item nav-settings__dropdown-item nav-dropdown__action t-14 t-black t-bold">
                                                <a data-control-name="nav.settings_signout" onClick={() => this.handleLogout()} id="ember9108" class="block ember-view" style={{fontSize: "80%"}}>              Sign out
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            )
        }
    
        return (
            <div>
            {navigationBar}
            </div>
            )
    }
}

export default Navbar;