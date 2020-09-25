import Axios from 'axios';
import React, {Component} from 'react';
import {Tab, Table} from 'semantic-ui-react';
import AppointmentCard from './secretary-edit-appointment-modal-day-all'
import moment from 'moment'

class day_all extends Component{

    constructor(props){
        super(props);

        this.state={
            appointments:[],
            currNumOfApp: 0,
            prevNumOfApp: 0,
            day: this.props.day,
        }

    }
    

    componentDidMount(){
       const day = {
           day: this.state.day
       }
        Axios.post('http://localhost:3000/secretary/day_all', day).then(res =>{
            return this.setState({
                appointments: res.data.data.data
            })
            
        })
        
    }

    appointmentlist=()=>{
        
        console.log(this.state.appointments);
        
        return this.state.appointments.map(({slot, appointments}, index)=>{
            return(
            <Table.Row key={index}>
                <Table.Cell id='day-all-time-cell'>{slot}</Table.Cell>
                {
                    <Table.Cell id='day-all-table-cell'>
                        <div id="day-all-div">
                            {          
                                appointments.map((appointment)=>{
                                    return ( <AppointmentCard
                                        appointment={appointment}
                                            />)
                            })
                            }
                        </div>
                    </Table.Cell>
                                        
                }
            </Table.Row>
            )
        })
        
    }

    componentDidUpdate(){
        if(this.props.appointments !== this.state.appointments){ 
               if(this.props.day != this.state.day){
                const day = {
                    day: this.props.day
                }
                Axios.post('http://localhost:3000/secretary/day_all', day).then(res =>{
                    return this.setState({
                        appointments: res.data.data.data,
                        day: this.props.day
                    })
                    
                })
            }
        }
    }
    render(){

       return(
           <>
            <Table id="table-header-title" compact>
                    <Table.Header fullWidth>
                        <Table.Row textAlign='center'>
                            <Table.Cell>Daily Appointments</Table.Cell>
                        </Table.Row>
                    </Table.Header>
                </Table>
                <Table id='week_all' celled fixed textAlign='center' compact>
                    <Table.Body>
                    {this.appointmentlist()}
                            
                    </Table.Body>
                </Table>
            </>
        )
    }
}

export default day_all
