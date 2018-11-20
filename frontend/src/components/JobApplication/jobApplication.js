import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ApplicantDetail from '../JobApplication/applicantDetial';
import ApplicantEducation from '../JobApplication/applicantEducation';
import EqualOpportunity from '../JobApplication/equalOpportunity';

import { connect } from "react-redux";

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});

function getSteps() {
  return ['Personal Detail', 'Education', 'Equal Opportunity' ];
}

class JobApplication extends React.Component {
    constructor(props){
        super(props); 
        this.state = {
          activeStep: 0,
        };
        this.dataStore = {
            fName:"",
            lName:"",
            email:"",
            phone:"",
            location:"",
            // school:"",
            // degree:"",
            // discipline:"",
            sponorship: "",
            hearAboutUs: "",
            linkedInUrl: "",
            gitWebUrl: "",
            gender: "",
            disability: "",
            veteran: "",
            race: "",
            resume:null,
            coverLetter:null
           
            };
        }

        getStepContent(step) {
          switch (step) {
            case 0: 
              return <ApplicantDetail getValues={() => (this.getValues())} updateValues={(u) => {this.updateValues(u)}}/>;
              case 1: 
              return <ApplicantEducation getValues={() => (this.getValues())} updateValues={(u) => {this.updateValues(u)}}/>;
            
            case 2:
              return <EqualOpportunity getValues={() => (this.getValues())} updateValues={(u) => {this.updateValues(u)}}/>;
       
              default:
              return 'Unknown step';
          }
        }
 
  getValues() {
      return this.dataStore;
      
    }
    
  updateValues(update) {
      this.dataStore = {
        ...this.dataStore,
        ...update,
      }
        this.props.saveApplication(this.dataStore);
       
    }

  handleNext = () => {
    if(this.state.activeStep === getSteps().length-1 ){
      let data = new FormData();
    console.log(this.dataStore)
    data.append('resume', this.dataStore.resume)
    data.append('fName',this.dataStore.fName)
    data.append('lName',this.dataStore.lName)
    data.append('phone',this.dataStore.phone)
    data.append('address',this.dataStore.location)
    data.append('email',this.dataStore.email)
    data.append('sponsorShipRequired',this.dataStore.sponorship)
    data.append('hearAboutUs',this.dataStore.hearAboutUs)
    data.append('linkedInUrl',this.dataStore.linkedInUrl)
    data.append('gitWebUrl',this.dataStore.gitWebUrl)
    data.append('gender',this.dataStore.gender)
    data.append('disable',this.dataStore.disability)
    data.append('veteran',this.dataStore.veteran)
    data.append('diversity',this.dataStore.race)
      this.props.submitApplication(data); 
    }
    else{
    this.setState ({
      activeStep: this.state.activeStep + 1,
    });
  }
  };

  handleBack = () => {
    this.setState ({
      activeStep: this.state.activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,

    });
  };

  render() {
   
   
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    let redirectVar = null;
   
   
    return (
      <div className={classes.root}>
       {redirectVar}
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <div>{this.getStepContent(index)}</div>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                      <Button variant="contained" color="primary" onClick={this.handleNext} className={classes.button}>
                        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&quot;r application is submitted</Typography>
          </Paper>
        )}
      </div>
    );
        
     
  }
}
JobApplication.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => {
  return{
      saveApplicationFlag: state.jobApplyReducer.saveApplictionFlag,
      saveApplication: state.jobApplyReducer.saveApplication
  }
}

const mapDispatchStateToProps = dispatch => {
 
  return {
      saveApplication: (values) => {
        dispatch({type:'SAVEAPPLICATION', payload: values})
      },
      submitApplication: (values) =>{
        
    
    console.log(values)
       axios.defaults.withCredentials = true;
       axios.post('http://localhost:3001/applyjob',values,{
         params: {

         }
       })
       .then(response => {
        dispatch({type: 'SUBMITAPPLICATION', payload: response, statusCode: response.status})
    })
    .catch(error => {
        dispatch({type: 'SUBMITAPPLICATION', payload: error.response, statusCode: error.response.status})
    })
      }
     
  }
}

 export default connect(mapStateToProps, mapDispatchStateToProps) (withStyles(styles)(JobApplication));
