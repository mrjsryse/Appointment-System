import React, {Component} from 'react';
import {Table} from 'semantic-ui-react'
import moment from 'moment'
import AddAppointment from './appointment_modal.component'

export default class SecretaryHeader extends Component{
    constructor(props){
        super(props);

        this.state={
            today:this.props.date,
            startOfWeek: moment(this.props.date).startOf('week'),
            endOfWeek: moment(this.props.date).endOf('week'),
            days:[],
            weekUnparsed:[]

        }
        
    }

    componentDidMount(){

        console.log("HELLO?")
        let day = this.state.startOfWeek
        let numdays=[]
        let unparsed=[]
        
        while(day <= this.state.endOfWeek){
            unparsed.push(day.toDate())
            let newDate=Date.parse(day)
            let formatted=moment(newDate).format("MMMM D, YYYY")
            numdays.push(formatted);
            day = day.clone().add(1, 'd');
        }
        let newArray=[]
        let backgroundColor ='red'
        let dated=Date.parse(this.state.today)
        let dateded =moment(dated).format("MMMM D, YYYY")

        newArray.push(<Table.Cell><AddAppointment></AddAppointment></Table.Cell>)
        for(let i =0; i < numdays.length; i++){
            if(numdays[i] == dateded){
                newArray.push(<Table.Cell onClick={()=>this.props.onChangeDate(this.state.unparsed[i])} style={{backgroundColor}}>{numdays[i]}</Table.Cell>)
            }
            else{
                newArray.push(<Table.Cell onClick={()=>this.props.onChangeDate(this.state.sunparsed[i])} >{numdays[i]}</Table.Cell>)
            }
        }
        this.setState({
            days:numdays,
            weekUnparsed:unparsed
            
        })




        
    }

    componentDidUpdate(){
        if(this.props.date !== this.state.today){
            
            let day = moment(this.props.date).startOf('week')
            let numdays=[]
            let unparsed=[]
            
            while(day <= moment(this.props.date).endOf('week')){
                unparsed.push(day.toDate())
                let newDate=Date.parse(day)
                let formatted=moment(newDate).format("MMMM D, YYYY")
                numdays.push(formatted);
                day = day.clone().add(1, 'd');
            }
            let newArray=[]
            let backgroundColor ='red'
            let dated=Date.parse(this.state.today)
            let dateded =moment(dated).format("MMMM D, YYYY")

            newArray.push(<Table.Cell><AddAppointment></AddAppointment></Table.Cell>)
            for(let i =0; i < numdays.length; i++){
                if(numdays[i] == dateded){
                    newArray.push(<Table.Cell onClick={()=>this.props.onChangeDate(this.state.unparsed[i])} style={{backgroundColor}}>{numdays[i]}</Table.Cell>)
                }
                else{
                    newArray.push(<Table.Cell onClick={()=>this.props.onChangeDate(this.state.unparsed[i])} >{numdays[i]}</Table.Cell>)
                }
            }
            this.setState({
                today: this.props.date,
                startOfWeek: moment(this.props.date).startOf('week'),
                endOfWeek: moment(this.props.date).endOf('week'),
                days:numdays,
                weekUnparsed:unparsed,
                
                
            })
        }
        
    }

    hello =(date)=>{
        console.log(date)
        this.setState({
            today: date
        })
    }

    render(){
        const newArray =[]
        let backgroundColor ='red'
        let newDate=Date.parse(this.state.today)
        let formatted =moment(newDate).format("MMMM D, YYYY")

        newArray.push(<Table.Cell><AddAppointment></AddAppointment></Table.Cell>)
        for(let i =0; i < this.state.days.length; i++){
            if(this.state.days[i] == formatted){
                newArray.push(<Table.Cell onClick={()=>this.props.onChangeDate(this.state.weekUnparsed[i])} style={{backgroundColor}}>{this.state.days[i]}</Table.Cell>)
            }
            else{
                newArray.push(<Table.Cell onClick={()=>this.props.onChangeDate(this.state.weekUnparsed[i])} >{this.state.days[i]}</Table.Cell>)
            }
        }

        return(
            <Table id="SECHEADER" columns='8' celled textAlign='center' style={{height:70+'px'}}>
                <Table.Row children={newArray}>
                    {/* {this.state.days.map(day=>
                    <Table.Cell onChange={()=> this.hello(day)} style={{backgroundColor}}>{day}
                        </Table.Cell>)} */}
                </Table.Row>
            </Table>
        )
    }
}