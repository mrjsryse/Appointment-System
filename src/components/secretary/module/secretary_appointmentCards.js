import React, {Component} from 'react';
import {Card} from 'semantic-ui-react';

export default class SecretaryAppointmentCard extends Component{
    // constructor(props){
    //     super(props);

    //     this.state={
    //         app_id: this.props.app_id,
    //         firstname: this.props.firstname,
    //         lastname: this.props.lastname,
    //         procedures: this.props.procedures,
    //         notes: this.props.notes,
    //         date: this.props.date,
    //         doctors:this.props.doctors,
    //         open:false,
    //         step:1,
    //     }
    // }



    render(){
        return(
            <>
            <Card>
                <Card.Header>
                    {this.props.appointment.firstname+" "+this.props.appointment.lastname}
                </Card.Header>
                
            </Card>
            </>
        )
    }
}