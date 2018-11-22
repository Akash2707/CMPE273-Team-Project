import React, { Component } from 'react';
import '../../App.css';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Typeahead } from 'react-bootstrap-typeahead';


export default class PostJobDetials extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: props.getStore().companyName,
            description: props.getStore().description,
            jobTitle: props.getStore().jobTitle,
            city: props.getStore().city,
            employmentType: props.getStore().employmentType,
            companyIndustry: props.getStore().companyIndustry,
            seniority: props.getStore().seniority,
            jobFunction: props.getStore().jobFunction,
        };

        this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

        this.validationCheck = this.validationCheck.bind(this);
        this.isValidated = this.isValidated.bind(this);
        this.cityChangeHandle = this.cityChangeHandle.bind(this);
        this.onChangeJobFunction = this.onChangeJobFunction.bind(this);
    }

    cityChangeHandle = city => {
        this.setState({ city });
    };

    onChangeJobFunction(values){
        this.setState({
            jobFunction : values
        });
    }

    componentDidMount() { }

    componentWillUnmount() { }

    isValidated() {
        const userInput = this._grabUserInput(); // grab user entered vals
        const validateNewInput = this._validateData(userInput); // run the new input against the validator
        let isDataValid = false;

        // if full validation passes then save to store and pass as valid
        if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
            if (this.props.getStore().companyName != userInput.companyName || this.props.getStore().description != userInput.description ||
                this.props.getStore().jobTitle != userInput.jobTitle || this.props.getStore().city != userInput.city ||
                this.props.getStore().employmentType != userInput.employmentType || this.props.getStore().companyIndustry != userInput.companyIndustry ||
                this.props.getStore().seniority != userInput.seniority || this.props.getStore().jobFunction != userInput.jobFunction) {

                this.props.updateStore({
                    ...userInput,
                    savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
                });  // Update store here (this is just an example, in reality you will do it via redux or flux)
            }

            isDataValid = true;
        }
        else {
            // if anything fails then update the UI validation state but NOT the UI Data State
            this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
        }

        return isDataValid;
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
            descriptionVal: (data.description != 0), // required: anything besides N/A
            companyNameVal: (data.companyName != 0),
            jobTitleVal: (data.jobTitle != 0),
            employmentTypeVal: (data.employmentType != 0),
            cityVal: (data.city != 0),
            companyIndustryVal: (data.companyIndustry != 0),
            seniorityVal: (data.seniority != 0),
            jobFunctionVal: (data.jobFunction != 0)
        }
    }

    _validationErrors(val) {
        const errMsgs = {
            descriptionValMsg: val.descriptionVal ? '' : 'A description is required',
            companyNameValMsg: val.companyNameVal ? '' : 'A company name is required',
            jobTitleValMsg: val.jobTitleVal ? '' : 'A job title is required',
            employmentTypeValMsg: val.employmentTypeVal ? '' : 'A employment type is required',
            cityValMsg: val.cityVal ? '' : 'A city is required',
            companyIndustryValMsg: val.companyIndustryVal ? '' : 'A company industry is required',
            seniorityValMsg: val.seniorityVal ? '' : 'A seniority is required',
            jobFunctionValMsg: val.jobFunctionVal ? '' : 'A job function is required'
        }
        return errMsgs;
    }

    _grabUserInput() {
        return {
            description: this.refs.description.value,
            companyName: this.refs.companyName.value,
            jobTitle: this.refs.jobTitle.value,
            employmentType: this.refs.employmentType.value,
            city: this.state.city,
            companyIndustry: this.refs.companyIndustry.value,
            seniority: this.refs.seniority.value,
            jobFunction: this.state.jobFunction
        };
    }

    render() {
        // explicit class assigning based on validation
        let notValidClasses = {};
        let redirectValue = null;
        // if(!localStorage.getItem('isOwner')){
        //     redirectValue = <Redirect to="/loginOwner"/>
        // }


        const functionOptions = ['Accounting/Auditng', 'Administrative', 'Advertising', 'Analyst', 'Art/Creative',
            'Business Developmemt', 'Consulting', 'Customer Service', 'Distribution', 'Design', 'Education', 'Engineering',
            'Finance', 'General Business', 'Health Care Provider', 'Human Resources', 'Information Technology', 'Legal', 'Managemeny',
            'Manufacturing', 'Marketing', 'Project Management', 'Production', 'Quality Assurance', 'Research', 'Sales', 'Science',
            'Supply Chain', 'Training', 'Writing']

        if (typeof this.state.companyNameValGrpCls == 'undefined' || this.state.companyNameVal) {
            notValidClasses.companyNameCls = 'no-error form-group col-md-6';
        }
        else {
            notValidClasses.companyNameCls = 'has-error form-group col-md-6';
            notValidClasses.companyNameValGrpCls = 'val-err-tooltip';
        }

        if (typeof this.state.jobTitleValGrpCls == 'undefined' || this.state.jobTitleVal) {
            notValidClasses.jobTitleCls = 'no-error form-group col-md-6';
        }
        else {
            notValidClasses.jobTitleCls = 'has-error form-group col-md-6';
            notValidClasses.jobTitleValGrpCls = 'val-err-tooltip';
        }

        if (typeof this.state.cityVal == 'undefined' || this.state.cityVal) {
            notValidClasses.cityCls = 'no-error form-group col-md-6';
        }
        else {
            notValidClasses.cityCls = 'has-error form-group col-md-6';
            notValidClasses.cityValGrpCls = 'val-err-tooltip';
        }

        if (typeof this.state.employmentTypeVal == 'undefined' || this.state.employmentTypeVal) {
            notValidClasses.employmentTypeCls = 'no-error form-group col-md-6';
        }
        else {
            notValidClasses.employmentTypeCls = 'has-error form-group col-md-6';
            notValidClasses.employmentTypeValGrpCls = 'val-err-tooltip';
        }

        if (typeof this.state.jobFunctionVal == 'undefined' || this.state.jobFunctionVal) {
            notValidClasses.jobFunctionCls = 'no-error form-group col-md-12';
        }
        else {
            notValidClasses.jobFunctionCls = 'has-error form-group col-md-12';
            notValidClasses.jobFunctionValGrpCls = 'val-err-tooltip';
        }      

        if (typeof this.state.companyIndustryVal == 'undefined' || this.state.companyIndustryVal) {
            notValidClasses.companyIndustryCls = 'no-error form-group col-md-6';
        }
        else {
            notValidClasses.companyIndustryCls = 'has-error form-group col-md-6';
            notValidClasses.companyIndustryValGrpCls = 'val-err-tooltip';
        }

        if (typeof this.state.seniorityVal == 'undefined' || this.state.seniorityVal) {
            notValidClasses.seniorityCls = 'no-error form-group col-md-6';
        }
        else {
            notValidClasses.seniorityCls = 'has-error form-group col-md-6';
            notValidClasses.seniorityValGrpCls = 'val-err-tooltip';
        }

        if (typeof this.state.descriptionVal == 'undefined' || this.state.descriptionVal) {
            notValidClasses.descriptionCls = 'no-error form-group col-md-12';
        }
        else {
            notValidClasses.descriptionCls = 'has-error form-group col-md-12';
            notValidClasses.descriptionValGrpCls = 'val-err-tooltip';
        }
        return (
            <div class="col-md-12" style={{ background: 'white', padding: '30px', marginTop: '35px' }}>
                {redirectValue}

                <div className="panel">
                    <h4><span style={{fontWeight: 'bold'}}>Step 1:</span> <span>What job do you want to post?</span></h4>
                </div>
                
                <form>
                    <div className="col-md-12">
                        <div className={notValidClasses.companyNameCls}>
                            <label for="companyName">Company Name</label>
                            <input
                                ref="companyName"
                                name="companyName"
                                autoComplete="off"
                                type="text"
                                className="form-control"
                                required
                                defaultValue={this.state.companyName}
                                onBlur={this.validationCheck} />

                            <div className={notValidClasses.companyNameValGrpCls}>{this.state.companyNameValMsg}</div>
                        </div>
                        <div className={notValidClasses.jobTitleCls}>
                            <label for="jobTitle">Job Title</label>
                            <input
                                ref="jobTitle"
                                name="jobTitle"
                                autoComplete="off"
                                type="text"
                                className="form-control"
                                required
                                defaultValue={this.state.jobTitle}
                                onBlur={this.validationCheck} />

                            <div className={notValidClasses.jobTitleValGrpCls}>{this.state.jobTitleValMsg}</div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className={notValidClasses.cityCls}>
                            <PlacesAutocomplete value={this.state.city} defaultValue={this.state.city} onChange={this.cityChangeHandle}>
                                {({ getInputProps, getSuggestionItemProps, suggestions, loading }) => (
                                    <div className="autocomplete-root">
                                        <label for="city">Location</label>
                                        <input {...getInputProps({ className: 'form-control', name: "city", type: "text", autoComplete: "noop" })} />
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
                            <div className={notValidClasses.cityValGrpCls}>{this.state.cityValMsg}</div>
                        </div>
                        <div className={notValidClasses.employmentTypeCls}>
                            <label for="employmentType">Employment Type</label>
                            <select
                                ref="employmentType"
                                name="employmentType"
                                autoComplete="off"
                                className="form-control"
                                required
                                defaultValue={this.state.employmentType}
                                onBlur={this.validationCheck}>
                                <option value="">Choose one..</option>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Contract">Contract</option>
                                <option value="Temporary">Temporary</option>
                                <option value="Volunteer">Volunteer</option>
                                <option value="Internship">Internship</option>
                            </select>
                            <div className={notValidClasses.employmentTypeValGrpCls}>{this.state.employmentTypeValMsg}</div>
                        </div>

                    </div>
                    <div className="col-md-12">
                        <div className={notValidClasses.jobFunctionCls}>
                            <label for="jobFunction">Job Function</label>
                            <Typeahead
                                labelKey="name"
                                multiple="true"
                                options={functionOptions}
                                placeholder="Choose a job function..."
                                name="jobFunction"
                                onChange={this.onChangeJobFunction}
                                selected={this.state.jobFunction}
                            />
                            <div className={notValidClasses.jobFunctionValGrpCls}>{this.state.jobFunctionValMsg}</div>
                        </div>
                    </div>



                    <div className="col-md-12">
                        <div className={notValidClasses.companyIndustryCls}>
                            <label for="companyIndustry">Company Industry</label>
                            <input
                                ref="companyIndustry"
                                name="companyIndustry"
                                autoComplete="noop"
                                type="text"
                                className="form-control"
                                required
                                defaultValue={this.state.companyIndustry}
                                onBlur={this.validationCheck} />
                            <div className={notValidClasses.companyIndustryValGrpCls}>{this.state.companyIndustryValMsg}</div>
                        </div>
                        <div className={notValidClasses.seniorityCls}>
                            <label for="propertyType">Seniority Level</label>
                            <select
                                ref="seniority"
                                name="seniority"
                                autoComplete="off"
                                className="form-control js-guestSelectorInput"
                                required
                                defaultValue={this.state.seniority}
                                onBlur={this.validationCheck}>
                                <option value="">Choose one..</option>
                                <option value="Internship">Internship</option>
                                <option value="Entry-Level">Entry-Level</option>
                                <option value="Associate">Associate</option>
                                <option value="Mid-Senior level">Mid-Senior level</option>
                                <option value="Director">Director</option>
                                <option value="Executive">Executive</option>
                                <option value="Not Applicable">Not Applicable</option>
                            </select>
                            <div className={notValidClasses.seniorityValGrpCls}>{this.state.seniorityValMsg}</div>
                        </div>
                    </div>

                    <div className="col-md-12">
                    <div className={notValidClasses.descriptionCls}>
                        <label for="description">Job Description</label>
                        <textarea rows="4"
                            ref="description"
                            autoComplete="off"
                            type="text"
                            name="description"
                            className="form-control"
                            required
                            defaultValue={this.state.description}
                            onBlur={this.validationCheck} />
                        <div className={notValidClasses.descriptionValGrpCls}>{this.state.descriptionValMsg}</div>
                    </div>
                    </div>

                </form>
                
            </div>
        )
    }
}