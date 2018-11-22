import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Joi from 'joi';
import Dropzone from 'react-dropzone';
import { Typeahead } from 'react-bootstrap-typeahead';
import InputRange from 'react-input-range';
import { Redirect } from 'react-router';
import 'react-input-range/lib/css/index.css';

export default class PostJobStep2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skills: props.getStore().skills,
      experience: props.getStore().experience,
      education: props.getStore().education,
      companyLogo: props.getStore().companyLogo,
      allowEasyApply: props.getStore().allowEasyApply,
      errorMessage: "",
      message: "",
      onSuccess: false,
    };


    this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms
    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);
    this.companyLogoHandler = this.companyLogoHandler.bind(this);
    this.onChangeSkillsFunction = this.onChangeSkillsFunction.bind(this);
    this.onChangeEducationFunction = this.onChangeEducationFunction.bind(this);
    this.onChangeExperience = this.onChangeExperience.bind(this);
    this.handleAllowEasyApply = this.handleAllowEasyApply.bind(this);
  }


  componentDidMount() { }

  componentWillUnmount() { }

  isValidated() {
    console.log("in validation")
    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator
    let isDataValid = false;
    return new Promise((resolve, reject) => {

      
      if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
        isDataValid = true;
        const data = this.props.getStore();
        
        let formData = new FormData();
        let skills = []
        this.state.skills.map(skill => {
            skills.push(skill.name)
         })
        
         formData.append('companyName', data.companyName)
         formData.append('description', data.description)
         formData.append('jobTitle', data.jobTitle)
         formData.append('city', data.city)
         formData.append('employmentType', data.employmentType)
         formData.append('companyIndustry', data.companyIndustry)
         formData.append('seniority', data.seniority)
         formData.append('jobFunction', data.jobFunction)
         formData.append('skills', skills)
         formData.append('minExperience', data.experience.min)
         formData.append('maxExperience', data.experience.max)
         formData.append('education', data.education)
         formData.append('companyLogo', data.companyLogo)
         formData.append('allowEasyApply', data.allowEasyApply)

         this.props.dispatch(formData);


       } else {
         // if anything fails then update the UI validation state but NOT the UI Data State
         this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
       }

      return isDataValid;

    });

    // if full validation passes then save to store and pass as valid
  }




  validationCheck() {
    if (!this._validateOnDemand)
      return;

    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator

    this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
  }

  _validateData(data) {
    return {
      skillsVal: (data.skills != 0),
      educationVal: (data.education != 0)
    }
  }

  _validationErrors(val) {
    const errMsgs = {
      skillsValMsg: val.skillsVal ? '' : 'Please add skills!',
      educationValMsg: val.educationVal ? '' : 'Please add education!',
    }
    return errMsgs;
  }

  _grabUserInput() {
    return {
      skills: this.state.skills,
      experience: this.state.experience,
      education: this.state.education,
      companyLogo: this.state.companyLogo,
      allowEasyApply: this.state.allowEasyApply
    };
  }


  

  onChange(e) {
    let newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }
  
  companyLogoHandler= (e) => {
    
    console.log(e.target.files)
    if (this.props.getStore().companyLogo != e.target.files[0]) { // only update store of something changed
      this.props.updateStore({
        ...{ 
          companyLogo: e.target.files[0],
         },
        savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
      });  // Update store here (this is just an example, in reality you will do it via redux or flux)
      this.setState({
        companyLogo: e.target.files[0],
        errorMessage: ""
      });
    }
  }

  onChangeSkillsFunction(values){
    if (this.props.getStore().skills != values) { // only update store of something changed
      this.props.updateStore({
        ...{ skills: values },
        savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
      });  // Update store here (this is just an example, in reality you will do it via redux or flux)
      this.setState({
        skills: values,
        errorMessage: ""
      });
    }
  }

  onChangeEducationFunction(values){
    if (this.props.getStore().education != values) { // only update store of something changed
      this.props.updateStore({
        ...{ education: values },
        savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
      });  // Update store here (this is just an example, in reality you will do it via redux or flux)
      this.setState({
        education: values,
        errorMessage: ""
      });
    }
  }

  onChangeExperience(values){
    if (this.props.getStore().experience != values) { // only update store of something changed
      this.props.updateStore({
        ...{ experience: values },
        savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
      });  // Update store here (this is just an example, in reality you will do it via redux or flux)
      this.setState({
        experience: values,
        errorMessage: ""
      });
    }
  }

  handleAllowEasyApply(event){
    if (this.props.getStore().allowEasyApply != event.target.checked) { // only update store of something changed
      this.props.updateStore({
        ...{ allowEasyApply: event.target.checked },
        savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
      });  // Update store here (this is just an example, in reality you will do it via redux or flux)
      this.setState({
        allowEasyApply: event.target.checked,
        errorMessage: ""
      });
    }
  }

  render() {
    // explicit class assigning based on validation
    let notValidClasses = {};
    let redirectValue = null;
    console.log(this.props.getStore())

    if (typeof this.state.skillsValGrpCls == 'undefined' || this.state.skillsVal) {
      notValidClasses.skillsCls = 'no-error form-group col-md-12';
    }
    else {
      notValidClasses.skillsCls = 'has-error form-group col-md-12';
      notValidClasses.skillsValGrpCls = 'val-err-tooltip';
    }

    if (typeof this.state.educationValGrpCls == 'undefined' || this.state.educationVal) {
      notValidClasses.educationCls = 'no-error form-group col-md-12';
    }
    else {
      notValidClasses.educationCls = 'has-error form-group col-md-12';
      notValidClasses.educationValGrpCls = 'val-err-tooltip';
    }

    if (typeof this.state.experienceVal == 'undefined' || this.state.experienceVal) {
      notValidClasses.experienceCls = 'no-error form-group col-md-12';
    }
    else {
      notValidClasses.experienceCls = 'has-error form-group col-md-12';
      notValidClasses.experienceValGrpCls = 'val-err-tooltip';
    }

    if (typeof this.state.companyLogoVal == 'undefined' || this.state.companyLogoVal) {
      notValidClasses.companyLogoCls = 'no-error form-group col-md-12';
    }
    else {
      notValidClasses.companyLogoCls = 'has-error form-group col-md-12';
      notValidClasses.companyLogoValGrpCls = 'val-err-tooltip';
    }

    if (typeof this.state.allowEasyApplyVal == 'undefined' || this.state.allowEasyApplyVal) {
      notValidClasses.allowEasyApplyCls = 'no-error form-group col-md-12';
    }
    else {
      notValidClasses.allowEasyApplyCls = 'has-error form-group col-md-12';
      notValidClasses.allowEasyApplyValGrpCls = 'val-err-tooltip';
    }


    if (this.state.onSuccess) {
      redirectValue = <Redirect to="/home" />
    }

    const educationOptions = ['High School Diploma', 'Associate\'s Degree', 'Bachelor\'s Degree', 'Master\'s Degree',
      'Master of Business Administration', 'Doctor of Philosopy', 'Doctor of Medicine', 'Doctor of Law']


    return (

      <div class="col-md-12" style={{ background: 'white', padding: '30px', marginTop: '35px' }}>
        {redirectValue}

        <div className="panel">
          <h4><span style={{ fontWeight: 'bold' }}>Step 2: </span> <span>What are the right qualifications for your job?</span></h4>
        </div>

        <form className="form">
          <div className="col-md-12">
            <div className={notValidClasses.skillsCls}>
              <label for="skills">What are some of the skills needed for this job? </label>
              <Typeahead
                labelKey="name"
                allowNew
                multiple
                newSelectionPrefix="Add a new item: "
                options={[]}
                onChange={this.onChangeSkillsFunction}
                name="skills"
                placeholder="Add Skills.."
                selected={this.state.skills}
                onBlur={this.validationCheck}
              />
              <div className={notValidClasses.skillsValGrpCls}>{this.state.skillsValMsg}</div>
            </div>
          </div>
          <div className="col-md-12">
            <div className={notValidClasses.experienceCls}>
              <label for="experience">What range of relevant experience are you looking for?</label>
              <InputRange
                draggableTrack
                maxValue={30}
                minValue={0}
                onChange={value => this.onChangeExperience(value)}
                onChangeComplete={value => console.log(value)}
                onBlur={this.validationCheck}
                value={this.state.experience} />
            </div>
            <div className={notValidClasses.experienceValGrpCls}>{this.state.experienceValMsg}</div>
          </div>
          <div className="col-md-12">
            <div className={notValidClasses.educationCls}>
              <label for="education">What level of education are you looking for? </label>
              <Typeahead
                labelKey="education"
                multiple
                options={educationOptions}
                onChange={this.onChangeEducationFunction}
                name="education"
                placeholder="Add Education.."
                onBlur={this.validationCheck}
                selected={this.state.education}
              />
              <div className={notValidClasses.educationValGrpCls}>{this.state.educationValMsg}</div>
            </div>
          </div>
          <div className="col-md-12">
            <div className={notValidClasses.companyLogoCls}>
              <label>Company Logo</label>
              <input type="file" className="form-control" name="companyLogo" accept="image/*" placeholder="Company Logo" onChange={this.companyLogoHandler} onBlur={this.validationCheck}/>
            </div>
            <div className={notValidClasses.companyLogoValGrpCls}>{this.state.companyLogoValMsg}</div>
          </div>
          <div className="col-md-12">
          <div className={notValidClasses.allowEasyApplyCls}>
          <label>Want to enable easy apply?  </label>
            <input
              name="allowEasyApply"
              type="checkbox"
              style={{marginLeft: "10px", lineHeight: '15px'}}
              checked={this.state.allowEasyApply}
              onChange={this.handleAllowEasyApply} />
          </div>
          </div>
        </form>
      </div>
    )
  }
}
