import React, { Component } from 'react';
import '../../App.css';
import StepZilla from 'react-stepzilla';
import PostJobDetials from './PostJobDetials';

import PostJobStep2 from './PostJobStep2';
import Step6 from './Step6';
import moment from 'moment';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';

class EditPostJobMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleStore: {}
    };

    this.sampleStore = {
      companyName: '',
      description: '',
      jobTitle: '',
      city: '',
      employmentType: '',
      companyIndustry: '',
      seniority: '',
      jobFunction: [],
      skills: [],
      experience: {
        min: 0,
        max: 3,
      },
      education: [],
      companyLogo: null,
      allowEasyApply: false,
      savedToCloud: false,
      jobId: ""
    };
  }


  componentWillMount() {
    try {
      var job = this.props.location.state.jobInfo
      this.sampleStore.jobId = job._id
      this.sampleStore.companyName = job.companyName
      this.sampleStore.description = job.description
      this.sampleStore.jobTitle = job.title
      this.sampleStore.city = job.city
      this.sampleStore.employmentType = job.employmentType
      this.sampleStore.companyIndustry = job.industry
      this.sampleStore.seniority = job.seniority
      this.sampleStore.jobFunction = job.jobFunction.split(',')
      this.sampleStore.skills = job.skills.split(',')
      this.sampleStore.experience.min = job.minExperience
      this.sampleStore.experience.max = job.maxExperience
      this.sampleStore.education = job.education.split(',')
      this.sampleStore.companyLogo = job.companyLogo
      this.sampleStore.allowEasyApply = job.allowEasyApply
      this.props.updateJobPostForm(this.sampleStore)
      this.updateStore(this.sampleStore)
      this.setState({
        sampleStore: this.sampleStore
      })
      
    } catch (e) {
      let detailPage = null
      detailPage = this.props.history.push({
        pathname: "/postedjobs",
        state: {
        }
      })
    }

  }

  
  componentWillReceiveProps() {
    console.log(this.props.jobAdded)
  }

  getStore() {
    return this.sampleStore;
  }

  updateStore(update) {
    this.sampleStore = {
      ...this.sampleStore,
      ...update,
    }
    this.props.updateJobPostForm(this.sampleStore)
  }

  submitJobHandle(data) {
    this.props.submitJob(data)

  }

  render() {
    //if not logged in go to login page
    let redirectVar = null;
    if (!localStorage.getItem('email') || localStorage.getItem('isRecruiter') == 'false') {
      redirectVar = <Redirect to="/login" />
    }
    if (this.props.jobAdded) {
      redirectVar = <Redirect to="/postedjobs" />
    }

    const steps =
      [
        { name: 'Step 1', component: <PostJobDetials getStore={() => (this.getStore())} updateStore={(u) => { this.updateStore(u) }} /> },
        { name: 'Step 2', component: <PostJobStep2 dispatch={(u) => { this.submitJobHandle(u) }} getStore={() => (this.getStore())} updateStore={(u) => { this.updateStore(u) }} /> },
        { name: 'Saving', component: <Step6 getStore={() => (this.getStore())} updateStore={(u) => { this.updateStore(u) }} /> },
      ]

    return (
      <div style={{ maxWidth: '80%', margin: 'auto' }}>
        {redirectVar}
        <div className="col-md-8">
          <div className='step-progress'>
            <StepZilla
              steps={steps}
              preventEnterSubmission={true}
              nextTextOnFinalActionStep={"Save"}
              hocValidationAppliedTo={[3]}
              startAtStep={0}
              onStepChange={(step) => window.sessionStorage.setItem('step', step)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <aside id="ember1216" class="job-sidebar ember-view" style={{ marginTop: '200px' }}>
            <div id="ember1223" class="job-hint ember-view">
              <figure aria-hidden="true" class="job-hint__bulb-icon"></figure>
              <header data-test-job-hint-header="" class="job-hint__header">
                Show your job to the right candidates
                  </header>
              <p data-test-job-hint-body="" class="job-hint__body">
                Include more details such as relevant job functions, industries, and seniority level to help us advertise your job post to qualified candidates and recommend matches for you to reach out to.
              </p>
            </div>
          </aside>
        </div>

      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    jobForm: state.postJobReducer.jobForm,
    jobAdded: state.postJobReducer.jobAdded,
  }
}

const mapDispatchStateToProps = dispatch => {
  return {
    updateJobPostForm: (values) => {
      dispatch({ type: 'POSTJOBFORM', payload: values })
    },
    submitJob: (values) => {
      console.log(values)
      axios.defaults.withCredentials = true;
      axios.put('http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/edit/job', values, {
        headers: { Authorization: localStorage.getItem('token') },
        params: {
          email: localStorage.getItem("email")
        }
      })
        .then(response => {
          console.log(response)
          dispatch({ type: 'EDITJOB', payload: response })
        })
        .catch(error => {
          dispatch({ type: 'EDITJOB', payload: error.response.data, statusCode: error.response.status })
        });
    }
  }
}

export default (connect(mapStateToProps, mapDispatchStateToProps))(EditPostJobMain)