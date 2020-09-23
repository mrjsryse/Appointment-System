import React, {Component} from 'react';
import {Card} from 'semantic-ui-react';
import SecretaryEdit from './secretary-edit-appointment-modal'


export default class SecretaryAppointmentCard extends Component{
    constructor(props){
        super(props);

        this.state={
            app_id: this.props.appointment._id,
            firstname: this.props.appointment.firstname,
            lastname: this.props.appointment.lastname,
            procedures: this.props.appointment.procedures,
            notes: this.props.appointment.notes,
            date: this.props.appointment.date,
            doctors:this.props.appointment.doctors,
            time: this.props.appointment.time
        }
    }

    triggerEdit=()=>{
        console.log("Hello?")
        return <SecretaryEdit/>
    }
    render(){
        return(
            <>
            {/* <Card onClick={this.triggerEdit}>  */}
                <Card fluid>
                <Card.Header>
                    {this.props.appointment.firstname+" "+this.props.appointment.lastname}
                </Card.Header>
            </Card>
            </>
        )
    }
}