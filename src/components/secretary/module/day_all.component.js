import Axios from 'axios';
import React, {Component} from 'react';
import {Tab, Table} from 'semantic-ui-react';
import AppointmentCard from './secretary-edit-appointment-modal'
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
        
        return this.state.appointments.map(({slot, weekAppointments}, index)=>{
            return(
            <Table.Row key={index}>
                <Table.Cell>{slot}</Table.Cell>
                {   
                    weekAppointments.map(({appointments})=>{
                        return( <Table.Cell>
                                        {
                                           appointments.map((appointment)=>
                                                // <Table.Row key={appointment._id}>
                                                //     <Table.Cell style={{width:10+'px'}}>
                                                        <AppointmentCard
                                                            appointment={appointment}
                                                        />
                                                //     </Table.Cell>
                                                // </Table.Row>
                                            )
                                        }

                            </Table.Cell>)
                  })
                }
            </Table.Row>
            )
        })
        
    }

    componentDidUpdate(){
        if(this.props.week != this.state.weeks){
            const week = {
                weeks: this.props.week
            }
             Axios.post('http://localhost:3000/secretary/week_all', week).then(res =>{
                 return this.setState({
                     appointments: res.data.data.data,
                     weeks: this.props.week
                 })
                 
             })
        }
    }
    render(){

       return(
            <Table id='week_all' celled fixed textAlign='center' columns='8'>
                <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell>Weekly Appointments</Table.HeaderCell>
                    </Table.Row>
                </Table.Header> 
                <Table.Body>
                        {this.appointmentlist()}
                    
                </Table.Body>
            </Table>
        )
    }
}

export default day_all
