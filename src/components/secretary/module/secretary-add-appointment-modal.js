import React, {Component} from 'react';
import moment from 'moment';
import {Modal, Form, Button} from 'semantic-ui-react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendar} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';



import AddProcMainForm from "./secretary-add-appointment-modal-form"





class AddModal extends Component {
    constructor(props){
    
      super(props);
      
      this.state ={
        firstname:'',
        lastname:'',
        patientcontact:'',
        procedures:[],
        process:'',
        notes:'',
        date: moment().toDate(),
        time: moment().toDate(),
        doctor:'',
        doctors:[],
        open: false,
        step: 1,
      }
      this.setOpen = this.setOpen.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleDate = this.handleDate.bind(this);
      this.handletime = this.handleDate.bind(this);
      this.handleDoctorChange = this.handleDoctorChange.bind(this);
    }

    

    

    //function for opening and closing the modal
    handleClose=()=>{
      this.setState({
        open: false,
        step : 1
      })
      setTimeout(() => {
        toast(
            {
                description: <p>Appointment Creation cancelled</p>,
                icon: 'check',
                animation: 'slide up',
                time:1000,
                color: 'red'

            },
            () => console.log('toast closed'),
            () => console.log('toast clicked'),
            () => console.log('toast dismissed')
        );
    }, 1000)
    }
    setOpen(){
      this.setState({
        open: !this.state.open,
        step : 1
      })
      
    }

    //Function for submitting values
    handleChange = input => e =>{
      this.setState({
        [input]: e.target.value
      })
      console.log(e.target.value)
    }
    handleSubmit=e=>{
      e.preventDefault()
      const appointment = {
        firstname:this.state.firstname,
        lastname:this.state.lastname,
        patientcontact: this.state.patientcontact,
        procedures: this.state.procedures,
        notes:this.state.notes,
        date:this.state.date,
        time:this.state.time,
        doctors:this.state.doctors,
      }

      axios.post('http://localhost:3000/secretary/create', appointment).then(res => console.log(res.data));
      this.setState({
        //Axios: Connects to DB and sends the data
      })
      setTimeout(() => {
        toast(
            {
                description: <p>Appointment Created</p>,
                icon: 'check',
                animation: 'slide up',
                time:1000,
                color: 'green'

            },
            () => console.log('toast closed'),
            () => console.log('toast clicked'),
            () => console.log('toast dismissed')
        );
    }, 1000)
      this.setOpen();
      // window.location.reload()
      
    } 

    //Datepicker change
    handleDate(date){
      this.setState({
        date:date
      })

      console.log(date)
     
    }

    handleDoctorChange =(e, {value}) => {
        this.setState({doctors:value})
        console.log(value)

      }

      handleProcessChange =(e, {value}) => {
        this.setState({procedures:value})
        console.log(value)

      }

    //Step changes in changing the prop
    //Proceeds to next step
    nextStep =()=>{
      const {step} = this.state;
      this.setState({
          step: step+1
      });
    }

    //Proceeds to previous step
    prevStep =()=>{
        const {step} = this.state;
        this.setState({
            step: step-1
        });
    }
    handleTime=(time)=>{
      this.setState({
        time:time
      })
      console.log(time)
    }
  
    render(){
      const {firstname, lastname, patientcontact, process, notes, date, time, doctors} = this.state;
      const values = {firstname, lastname, patientcontact, process, notes, date, time, doctors}
      let button;
      let button2;
      if(this.state.step === 1){
        button = <Button onClick={this.nextStep} type='button'>Next</Button>
      } else{
        button = <Button type="button" color="green" onClick={this.handleSubmit}>Submit</Button>
        button2 = <Button onClick={this.prevStep}>Back</Button>
      }
      return (
        <>
          <SemanticToastContainer position='top-center'></SemanticToastContainer>
          <Modal
            onClose={this.setOpen}
            onOpen={this.setOpen}
            open={this.state.open}
            as={Form}
            onSubmit={this.handleSubmit}
            trigger={
            <div className="circular ui pink icon button with tooltip" data-title="Add (ENTER)" data-content="Adds an appointment" data-variation="basic" data-position="bottom center" id="add-button">
            <i className="large plus icon"></i>
            </div>}
          >
          
          <Modal.Content>
                  <AddProcMainForm
                    handleChange = {this.handleChange}
                    handleDoctorChange = {this.handleDoctorChange}
                    handleProcessChange = {this.handleProcessChange}
                    handleDate = {this.handleDate}
                    handleTime = {this.handleTime}
                    setOpen = {this.setOpen}
                    prevStep = {this.prevStep}
                    nextStep = {this.nextStep}
                    step = {this.state.step}

                  />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleClose}>Cancel</Button>
            {button2}
            {button}
            
          </Modal.Actions>
          </Modal>
        </>
        
        
      )
    }
  }
export default AddModal