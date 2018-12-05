import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead';
import '../../messageCss/Message.css'

class Messaging extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: {},
            listConversation: [],
            listMessage: [],
            messageSend: "",
            uId: "",
            uName: "Messages"
        }

        this.messageChangeHandler = this.messageChangeHandler.bind(this);
        this.onMessageViewHandler = this.onMessageViewHandler.bind(this);
        this.onMessageSendHandler = this.onMessageSendHandler.bind(this);
    }

    componentWillMount() {
        console.log(this.props.location.state);
        axios.get('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/conversation', {
            headers: { Authorization: localStorage.getItem('token') },
            params: {
                email: localStorage.getItem('email'),
            }
        }).then((response) => {
            console.log(response)
            //update the state with the response data
            this.setState({
                listConversation: response.data.conversation
            })
        }).catch(error => {
            console.log("else")
            this.setState({

            })
        });
        try {
            var propName = this.props.location.state.name
            var propEmail = this.props.location.state.email
            var propImage = this.props.location.state.profilePhoto
        } catch (e) { }
        console.log(propEmail)
        if (propEmail != null) {
            axios.get('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/newconversation', {
                headers: { Authorization: localStorage.getItem('token') },
                params: {
                    name1: localStorage.getItem('name'),
                    name2: propName,
                    email1: localStorage.getItem('email'),
                    email2: propEmail,
                    image1: localStorage.getItem("profileImage"),
                    image2: propImage
                }
            }).then((response) => {
                console.log(response)
                //update the state with the response data
                this.setState({
                    listMessage: response.data.messageList.messages,
                    uName: this.props.location.state.name,
                    uId: response.data.messageList.id
                })
            }).catch(error => {
                console.log("else")
                this.setState({

                })
            });
            console.log(this.state.listConversation);
        }
    }


    messageChangeHandler = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    onMessageViewHandler(idName) {
        this.setState({
            uId: idName[0],
            uName: idName[1]
        })

        axios.defaults.withCredentials = true;
        axios.get('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/viewmessages', {
            headers: { Authorization: localStorage.getItem('token') },
            params: {
                id: idName[0]
            }
        }).then((response) => {
            console.log(response)
            //update the state with the response data
            this.setState({
                listMessage: response.data.messageList,
            })
        }).catch(error => {
            console.log("else")
            this.setState({

            })
        });
    }

    onMessageSendHandler(id) {
        var data = {
            id: this.state.uId,
            content: this.state.message,
        }
        console.log(data);
        axios.defaults.withCredentials = true;
        axios.post('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/message', data, {
            headers: { Authorization: localStorage.getItem('token') },
            params: {
                email: localStorage.getItem('email'),
                name: localStorage.getItem('name'),
                profileImage: localStorage.getItem('profileImage')
            }
        }).then((response) => {
            console.log(response)
            //update the state with the response data
            this.setState({
                messageSend: response.data.message
            })
        }).catch(error => {
            console.log("else")
            this.setState({

            })
        });
    }


    render() {
        console.log(this.state.uId);
        console.log(this.state.listMessage);
        let conversation = null;
        let conversationDisplay = null;
        let imageDisplay = null;
        let messageDisplay = null;
        let id = null;
        let name = "";
        let image = "";
        let redirectVar = null;
        if (!localStorage.getItem('email')) {
            redirectVar = <Redirect to="/login" />
        }
        try {
            if (this.state.listConversation.length != 0) {
                conversationDisplay = this.state.listConversation.map((conversation) => {
                    id = conversation._id
                    let participants = conversation.participants
                    imageDisplay = conversation.participantsImage;
                    console.log(participants);
                    console.log(participants.length);
                    for (let i = 0; i < participants.length; i++) {
                        if (localStorage.getItem('name') != participants[i]) {
                            name = participants[i]
                            console.log(name);
                        }
                    }
                    for (let i = 0; i < imageDisplay.length; i++) {
                        if (localStorage.getItem('profileImage') != imageDisplay[i]) {
                            image = imageDisplay[i]
                            console.log(image);
                        }
                    }
                    var idName = [conversation._id, name]
                    return (<div>
                        <hr style={{ margin: "0px" }} />
                        <div class="row" style={{ margin: "10px", marginTop: "15px", cursor: "pointer" }} onClick={() => { this.onMessageViewHandler(idName) }}>
                            <div class="col-md-2">
                                <div aria-label="Kevin Bell Romero" id="ember1389" class=" presence-entity__image EntityPhoto-circle-4 ember-view" style={{ backgroundImage: `url(${image})` }}    >
                                    <span class="visually-hidden">Demo Man</span>
                                </div>
                            </div>
                            <div class="col-md-8" style={{ marginTop: "10px" }}>
                                <label>{name}</label>
                            </div>
                        </div>
                    </div>
                    )
                })
            }
        } catch (e) { }
        try {
            if (this.state.listMessage.length != 0) {
                messageDisplay = this.state.listMessage.map((message) => {
                    console.log("render ID" + message.timeCreated);
                    return (
                        <div class="row" style={{ margin: "20px" }}>
                            <div class="col-md-2" style={{ paddingRight: "0px" }}   >
                                <div aria-label="Kevin Bell Romero" id="ember1389" class="message-image" style={{ backgroundImage: `url(${message.profileImage})` }}    >
                                    <span class="visually-hidden">Demo Man</span>
                                </div>
                            </div>
                            <div class="col-md-8" style={{ paddingLeft: "0px" }}>
                                <div>
                                    <label style={{ fontWeight: "bold", fontSize: "14px" }}>{message.sender}</label>
                                </div>
                                <span>{message.content}
                                </span>
                            </div>

                        </div>
                    )

                })
            }
        } catch (e) { }


        console.log(this.state.listConversation);
        return (
            <div className="col-md-12">
                {redirectVar}
                <div className="col-md-4" style={{ padding: "0px" }}>
                    <div style={{ marginLeft: "20px" }}>
                        <div className="card" style={{ marginTop: "70px", height: "520px" }}>
                            <div className="card-body">
                                <header className="pv-profile-section__card-header">
                                    <div className="row" style={{ padding: "5px" }}>
                                        <div className="col-md-10">
                                            <h4 style={{ padding: "4px", marginBottom: "0px", fontWeight: "initial", fontSize: "20px", marginLeft: "5px" }}>
                                                Messaging
                                        </h4>
                                        </div>
                                        <div className="col-md-2" style={{ marginRight: "0px", textAlign: "center", marginTop: "2px" }}>
                                            <a data-control-name="compose_message" title="Compose a new message" id="ember923" class="msg-conversations-container__compose-link button-tertiary-medium-round ember-view">
                                                <span class="svg-icon-wrap">
                                                    <span class="visually-hidden">Compose a new message</span>
                                                    <li-icon aria-hidden="true" type="compose-icon">
                                                        <svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" preserveAspectRatio="xMinYMin meet" class="artdeco-icon" focusable="false">
                                                            <path d="M17,13.75l2-2V20a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V6A1,1,0,0,1,4,5h8.25l-2,2H5V19H17V13.75Zm5-8a1,1,0,0,1-.29.74L13.15,15,7,17l2-6.15,8.55-8.55a1,1,0,0,1,1.41,0L21.71,5A1,1,0,0,1,22,5.71ZM17.93,7.58l-1.5-1.5-6.06,6.06,1.5,1.5Zm1.84-1.84-1.5-1.5L17.09,5.41l1.5,1.5Z" class="large-icon" style={{ fill: "currentColor" }}>
                                                            </path>
                                                        </svg>
                                                    </li-icon>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </header>
                            </div>
                            {conversationDisplay}
                        </div>
                    </div>
                </div>
                <div className="col-md-6" style={{ padding: "0px" }}>
                    <div>
                        <div className="card" style={{ marginTop: "70px", height: "520px" }} >
                            <div className="card-body">
                                <header className="pv-profile-section__card-header">
                                    <div className="row">
                                        <div className="col-md-10">
                                            <p style={{ padding: "8px", marginBottom: "0px", margin: "0px", fontWeight: "initial", fontSize: "20px", marginLeft: "5px" }}>
                                                <b>  {this.state.uName} </b>
                                            </p>
                                        </div>
                                    </div>
                                </header>
                            </div><hr style={{ margin: "0px" }} />
                            <div style={{ overflowY: "scroll", height: "340px" }}>
                                {messageDisplay}
                            </div>
                            <textarea onChange={this.messageChangeHandler} name="message" placeholder="Write a message" rows="5" cols="90" style={{ marginLeft: "0px" }} required />
                        </div>
                    </div>
                </div>
                <form onSubmit={this.onMessageSendHandler}>
                    <button class="btn message-btn" style={{ marginTop: "600px", marginLeft: "-80px" }} type="submit" value="Send">Send</button>
                </form>
            </div >
        )
    }
}
export default Messaging;   