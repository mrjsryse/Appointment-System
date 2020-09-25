import Axios from 'axios';
import React, {Component} from 'react';
import {Tab, Table, TableRow} from 'semantic-ui-react';
import AppointmentCard from './secretary-edit-appointment-modal'

/* CSS FILES */
import '../secretary_css/secretary-view.css'

class week_all extends Component{

    constructor(props){
        super(props);

        this.state={
            appointments:[],
            currNumOfApp: 0,
            prevNumOfApp: 0,
            weeks: this.props.week,
        }

    }
    

    componentDidMount(){
       const week = {
           weeks: this.state.weeks
       }
        Axios.post('http://localhost:3000/secretary/week_all', week).then(res =>{
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
                <Table.Cell id="week-all-time-cell">{slot}</Table.Cell>
                {   
                    weekAppointments.map(({appointments})=>{
                        return( <Table.Cell id='week-all-table-cell'>
                                        {
                                           appointments.map((appointment)=>
                                                        <AppointmentCard id="secretary-appointment-card"
                                                            appointment={appointment}
                                                        />
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
            <>
                <Table id="table-header-title" compact>
                    <Table.Header fullWidth>
                        <TableRow textAlign='center'>
                            <Table.Cell>Weekly Appointments</Table.Cell>
                        </TableRow>
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

export default week_all
