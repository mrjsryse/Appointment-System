/**
 *  Description: Contains the first two steps in creating an Appointment.
 *  
 *  Includes: Date Picking, Time Picking, Next Button, Cancel Button
 * 
 * 
 */
import React, {Component, useState} from 'react';
import moment from 'moment';
import { Button, Header, Image, Modal, Form, Select, Dropdown } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';


import "react-datepicker/dist/react-datepicker.css"
import "../secretary_css/addProcStep1.scss"

class addProcStep1 extends Component {
    constructor(props){
        super(props)
        this.state = {
            date: moment().toDate(),
            time:''
        }

        this.onchangeDate = this.onchangeDate.bind(this)
        this.onChangeTime = this.onChangeTime.bind(this)
    } 

    onchangeDate(date){
      this.setState({
        date:date
      })
    }

    onChangeTime=(e, {name, value})=>{
        this.setState({
            [name]:value
        })
        console.log(this.state.time)
    }
    
    //Continues to step 2
    continue = e =>{
        e.preventDefault()
        this.props.nextStep()
    }
    cancel = e =>{
        e.preventDefault()
        this.props.setOpen()
    }

    
  
    render(){
        const {handleDate, handleTime } = this.props
        const timeSlotsArray = [{key : "8:00 AM", value : "8:00 AM", text : "8:00 AM"}, 
                                {key : "8:30 AM", value : "8:30 AM", text :"8:30 AM"},
                                {key : "9:00 AM", value : "9:00 AM", text : "9:00 AM"},
                                {key : "9:30 AM", value : "9:30 AM", text : "9:30 AM"},
                                {key : "10:00 AM", value : "10:00 AM", text : "10:00 AM"}, 
                                {key : "10:30 AM", value : "10:30 AM", text : "10:30 AM"},
                                {key : "11:00 AM", value : "11:00 AM", text : "11:00 AM"}, 
                                {key : "11:30 AM", value : "11:30 AM", text : "11:30 AM"},
                                {key : "12:00 PM", value : "12:00 PM", text : "12:00 PM"}, 
                                {key : "12:30 PM", value : "12:30 PM", text : "12:30 PM"},
                                {key : "13:00 PM", value : "13:00 PM", text : "1:00 PM"}, 
                                {key : "13:30 PM", value : "13:30 PM", text : "1:30 PM"},
                                {key : "14:00 PM", value : "14:00 PM", text : "2:00 PM"}, 
                                {key : "14:30 PM", value : "14:30 PM", text : "2:30 PM"},
                                {key : "15:00 PM", value : "15:00 PM", text : "3:00 PM"}, 
                                {key : "15:30 PM", value : "15:30 PM", text : "3:30 PM"},
                                {key : "16:00 PM", value : "16:00 PM", text : "4:00 PM"}, 
                                {key : "16:30 PM", value : "16:30 PM", text : "4:30 PM"},
                                {key : "17:00 PM", value : "17:00 PM", text : "5:00 PM"}, 
                                {key : "17:30 PM", value : "17:30 PM", text : "5:30 PM"},
                                {key : "18:00 PM", value : "18:00 PM", text : "6:00 PM"}];
        return(

            <div>
                <Form>
                    <Form.Input required
                    label = 'Date'
                    className = "addProcStep1Date"
                    control={DatePicker}
                        selected={this.state.date}
                        onChange={this.onchangeDate}
                        onSelect={handleDate}
                        minDate={this.state.date}
                        >
                    </Form.Input>
                    <Dropdown
                    fluid
                    selection
                    name='time'
                    placeholder="Select Timeslot" options={timeSlotsArray}
                    onChange={handleTime}/>
                </Form>
                
               
            </div>
        )
    }
  }
export default addProcStep1