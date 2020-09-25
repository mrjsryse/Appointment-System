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
            time: moment().toDate()
        }

        this.onchangeDate = this.onchangeDate.bind(this)
        this.onchangeTime = this.onchangeTime.bind(this)
    } 

    onchangeDate(date){
      this.setState({
        date:date
      })
    }
    onchangeTime(time){
        this.setState({
            time:time
        })
        this.props.handleTime(time)
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
        const {handleDate} = this.props
                                
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
                    <Form.Input required
                        label = "Time"
                        className = "addProcStep1Time"
                        control={DatePicker}
                            showTimeSelect
                            showTimeSelectOnly
                            selected={this.state.time}
                            timeIntervals={30}
                            dateFormat="h:mm aa"
                            onChange={this.onchangeTime}
                            minTime={moment().toDate().setHours(9)}
                            maxTime={moment().toDate().setHours(18)}>
                    </Form.Input>
                        
                </Form>
                
               
            </div>
        )
    }
  }
export default addProcStep1