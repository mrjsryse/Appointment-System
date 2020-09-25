/**
 *  Description: Contains the first two steps in creating an Appointment.
 *  
 *  Includes: Date Picking, Time Picking, Next Button, Cancel Button
 * 
 * 
 */
import React, {Component, useState} from 'react';
import moment from 'moment';
import { Button, Header, Image, Modal, Form, Dropdown, Step, TextArea } from 'semantic-ui-react'
import axios from 'axios'
import _ from 'lodash'

class addProcStep2 extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            procedure:'',
            procedures:[],
            doctors:[],
            doctor:'',
            value:[],
            multiple: true
        }
    }


    
    componentDidMount(){
        axios.get('http://localhost:3000/secretary/getProcess')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        procedures: [
                            ...response.data.map(procedure =>{
                                return{
                                    key: procedure._id,
                                    text: procedure.processname,
                                    value: procedure._id
                                }
                            })
                        ],
                        // procedures: response.data.map(procedure => procedure.processname),
                        procedure: response.data[0].processname, 

                    })
                }
            })

        axios.get('http://localhost:3000/secretary/getDoctors')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({   
                        doctors: [
                            ...response.data.map(doctor =>{
                                return{
                                    key: doctor._id,
                                    text: "DR. "+doctor.lastname,
                                    value: doctor._id
                                }
                            })
                        ],
                        doctor: response.data[0].firstname
                    })
                }
            })

    }

    
    render(){
        const {values, handleChange, handleDoctorChange, handleProcessChange} = this.props
        return(
            <Form>
                <Form.Input required
                    placeholder='First Name'
                    onChange = {handleChange('firstname')}
                    label="First Name"
                    name="firstname"
                    id= "processFirstName"
                />
                <Form.Input required
                    placeholder='Last Name'
                    onChange = {handleChange('lastname')}
                    label="Last Name"
                    name="lastname"
                    id= "processLastName"
                />
                <Form.Input required
                    placeholder='Contact Number'
                    onChange = {handleChange('patientcontact')}
                    label="Contact Number"
                    name="patientcontact"
                    id= "processPatientContact"
                />
                <Form.Dropdown
                    placeholder='Procedure/s'
                    onChange={handleProcessChange}
                    options={this.state.procedures}
                    selection fluid multiple
                    id= "processDropProc">
                    
                </Form.Dropdown>
                <Form.TextArea required
                    placeholder='Notes'
                    onChange = {handleChange('notes')}
                    label="notes"
                    name="notes"
                    id= "processNotes"
                />
                <Form.Dropdown
                    placeholder='Doctor/s'
                    onChange={handleDoctorChange}
                    options={this.state.doctors}
                    selection fluid multiple
                    id= "processDropDoctor">
                </Form.Dropdown>

                
            </Form>
        )
    }
}
export default addProcStep2