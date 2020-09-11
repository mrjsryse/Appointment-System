import React, {Component} from 'react';
import Navbar from "../module/secretary_navigationbar"
import AddAppointment from "../module/appointment_modal.component"
import {Grid, Header, Dropdown} from "semantic-ui-react"
import moment from 'moment'
import axios from 'axios'
import SecretaryHeader from "../module/secretary_header"
import SecretaryTable from "../module/secretary_table"
import Trrial from "../views/day_all.component"

export default class Secretary extends Component{

    constructor(props){
        super(props);
        this.state = {
            doctors:[],
            view:'day',
            filter:'appointments',
            date: moment().toDate(), 
            startOfWeek: moment(this.props.date).startOf('week'),
            endOfWeek: moment(this.props.date).endOf('week'),
            
        }

        this.onChangeDate = this.onChangeDate.bind(this)
    }

    componentDidMount(){
        axios.get('http://localhost:3000/secretary/getDoctors')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({   
                        doctors: [
                            ...response.data.map(doctor =>{
                                return{
                                    key: doctor._id,
                                    text: doctor.firstname+" "+doctor.lastname,
                                    value: doctor._id
                                }
                            })
                        ],
                    })
                }
            })
    }

    //changes the current date
    onChangeDate(date){
        console.log('changing date to: ', date);
        if(date == null){
            this.setState({
                date: moment().toDate()
            });
        }else{
            this.setState({
                date:date
            })
        }
    }
    onChangeView=(e, {name, value})=>{
        this.setState({
          [name]:value
        })
        console.log(value)
      }
    onToday= () =>{
        console.log('Changing date to today');
        this.setState({
            date: moment().toDate()
        })
    }
    onPrev=()=>{
        let prev_date = moment(this.state.date).clone().subtract(1, 'day').toDate()
        console.log('change to: ', prev_date)
        this.setState({
            date: prev_date
        })
    }

    onNext=()=>{
        let next_date = moment(this.state.date).clone().add(1, 'day').toDate()
        console.log('change to: ', next_date)
        this.setState({
            date: next_date
        })
        
    }
    render(){
        const viewer=[
            {text:"DAY", key:"day", value:"day"},
            {text:"WEEK", key:"week", value:"week"}
        ]
        let currView
        if(this.state.view == 'week' ){
            currView = <SecretaryTable></SecretaryTable>
        }
        else if(this.state.view == 'day'){
            currView = <Trrial></Trrial>
        }
        return(
            <>
                <Header id='secretary_header_container' content={
                    <Navbar id='secretary_navbar'
                        // doctors={doctors}
                        // views={views}
                        onChangeDate={this.onChangeDate}
                        onPrev={this.onPrev}
                        onNext={this.onNext}
                        onToday={this.onToday}
                        onChangeView={this.onChangeView}
                        date={this.state.date}
                        viewer={viewer}
                        doctors={this.state.doctors}
                    />
                }
                    style={{height: 65+'px'}}/>
                <SecretaryHeader id='secretary_dateHeader'
                    date={this.state.date}
                    onChangeDate={this.onChangeDate}
                >

                </SecretaryHeader>
                {currView}
                
                
            </>
        )
            
            
    }
}