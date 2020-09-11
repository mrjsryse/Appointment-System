import Axios from 'axios';
import React, {Component} from 'react';
import {Table, TableCell} from 'semantic-ui-react';
import AppointmentCard from './secretary_appointmentCards'

class SecretaryTable extends Component{

    constructor(props){
        super(props);

        this.state={
            appointments:[]
        }

    }

    componentDidMount(){
        Axios.get('http://localhost:3000/secretary/appointmentlist')
            .then(response=>{
                this.setState({appointments: response.data})
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    appointmentlist=()=>{
        return this.state.appointments.map(currApp=>{
            console.log(currApp._id)
            return(
                <Table.Row>
                    <Table.Cell key={currApp._id}>
                        <AppointmentCard 
                            appointment={currApp}
                        />
                    </Table.Cell>
                
                </Table.Row>
            )
             
        })
    }

    render(){

        const trials=[
            {name:'Hello', key:1},
            {name:'Hell', key:2},
            {name:'Hel', key:3},
            {name:'He', key:4},
        ];
       return(
            <Table id='week_all' celled> 
                <Table.Body>
                    {/* {trials.map(trial =><Table.Row key={trial.key}> 
                        <TableCell children={trial.name}/>
                    </Table.Row>)} */}
                    {this.appointmentlist()}

                    
                </Table.Body>
            </Table>
        )
    }
}

export default SecretaryTable