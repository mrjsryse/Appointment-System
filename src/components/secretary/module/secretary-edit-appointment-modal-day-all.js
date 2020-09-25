import React, {Component} from 'react';
import moment from 'moment';
import {Modal, Form, Button} from 'semantic-ui-react'
import axios from 'axios'
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import {Card} from 'semantic-ui-react';



import EditProcMainForm from "./secretary-edit-appointment-modal-form"
import '../secretary_css/secretary-view.css'





class EditModal extends Component {
    constructor(props){
    
      super(props);
      
      this.state ={
            // app_id: this.props.appointment._id,
            firstname: this.props.appointment.firstname,
            lastname: this.props.appointment.lastname,
            procedures: this.props.appointment.process,
            notes: this.props.appointment.notes,
            date: moment(this.props.appointment.date).toDate(),
            doctors: this.props.appointment.doctor,
            patientcontact: this.props.appointment.patientcontact,
            time: moment(this.props.appointment.time, "h:mm A").toDate(),
            currentProcs:[],
            currentDocs:[],
        open: false,
        step: 1,
      }
      this.setOpen = this.setOpen.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleDate = this.handleDate.bind(this);
      this.handletime = this.handleDate.bind(this);
      this.handleDoctorChange = this.handleDoctorChange.bind(this);
    }

    

    componentDidMount(){
      //Changes back the procedures and doctors to IDs rather than objects
      this.setState({
        procedures:[
          this.state.procedures.map(procedure=>{
            return procedure._id
          })
        ],
        doctors:[
          this.state.doctors.map(doctor=>{
            return doctor._id
          })
        ],
        currentProcs:[
            this.state.procedures.map(procedure=>{
                return procedure.processname
              })
        ],
        currentDocs:[
            this.state.doctors.map(doctor=>{
                return  "Dr. "+ doctor.lastname
              })
        ]
      })
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
      if(moment(this.state.date).isBefore(moment().toDate())){
            setTimeout(() => {
            toast(
                {
                    description: <p>Cannot edit past dates</p>,
                    icon: 'clock',
                    animation: 'slide up',
                    time:1000,
                    color: 'red'
    
                },
                () => console.log('toast closed')
            );
            }, 1000)
          this.setState({
              open:false
          })
      }
      else{
          this.setState({
        open: !this.state.open,
        step : 1
            })
        }
      
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

      axios.post('http://localhost:3000/secretary/edit', appointment).then(res => console.log(res.data));
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

    displaycontent=()=>{
        return(console.log(this.state.currentDocs.join(', Dr.')))
    }

  
    render(){
      const {firstname, lastname, patientcontact, procedures, notes, date, time, doctors} = this.state;
      const values = {firstname, lastname, patientcontact, procedures, notes, date, time, doctors}
      let button;
      let button2;
      if(this.state.step === 1){
        button = <Button onClick={this.nextStep} type='button'>Next</Button>
      } else{
        button = <Button type="button" color="green" onClick={this.handleSubmit}>Submit</Button>
        button2 = <Button onClick={this.prevStep}>Back</Button>
      }

      if(this.state.date === moment().toDate()){
          console.log("I won't let you edit this")
      }
      else{
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
                    <Card fluid id="secretary-card-day"> 
                        <Card.Header>
                            {this.props.appointment.firstname+" "+this.props.appointment.lastname}
                        </Card.Header>
                        <Card.Content>
                            <text className="secretary-card-day-content">🦷: {this.state.currentProcs.join(", ")}</text><br/>
                            <text className="secretary-card-day-content">📱: {patientcontact}</text><br/>
                            <text className="secretary-card-day-content">👨‍⚕️: {this.state.currentDocs.join(", ")}</text>
                        </Card.Content>
                    </Card>
                }
            >
            
            <Modal.Content>
                    <EditProcMainForm
                        handleChange = {this.handleChange}
                        handleDoctorChange = {this.handleDoctorChange}
                        handleProcessChange = {this.handleProcessChange}
                        handleDate = {this.handleDate}
                        handleTime = {this.handleTime}
                        setOpen = {this.setOpen}
                        prevStep = {this.prevStep}
                        nextStep = {this.nextStep}
                        step = {this.state.step}
                        values={values}

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
  }
export default EditModal