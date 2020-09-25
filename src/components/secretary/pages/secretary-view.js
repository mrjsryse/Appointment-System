import React, {Component} from 'react';
import Navbar from "../module/secretary-navigationbar"
import AddAppointment from "../module/secretary-add-appointment-modal"
import {Grid, Header, Dropdown} from "semantic-ui-react"
import moment from 'moment'
import axios from 'axios'
import SecretaryHeader from "../module/secretary-header"
import SecretaryTable from "../module/secretary-week-all"
import Trrial from "../module/secretary-day-all"

/*CSS FILES*/
import '../secretary_css/secretary-view.css'

export default class Secretary extends Component{

    

    constructor(props){
        super(props);
        
            let dayStart = moment(moment().toDate()).startOf('week')
            let dayEnd = moment(moment().toDate()).endOf('week')
            let numdays=[]
            let unparsed=[]
            
            while(dayStart <= dayEnd){
                unparsed.push(dayStart.toDate().toString())
                let newDate=Date.parse(dayStart)
                let formatted=moment(newDate).format("MMMM D, YYYY")
                numdays.push(formatted);
                dayStart = dayStart.clone().add(1, 'd');
            }

        this.state = {
            doctors:[],
            appointments:[],
            view:'day',
            filter:'appointments',
            date: moment().toDate(), 
            startOfWeek: moment(moment().toDate()).startOf('week'),
            endOfWeek: moment(moment().toDate()).endOf('week'),
            days:numdays,
            weekUnparsed:unparsed
            
            
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
        axios.get('http://localhost:3000/secretary/appointmentlist')
            .then(response=>{
                this.setState({
                    appointments: response.data,
                })
            })
            .catch((error)=>{
                console.log(error)
        })

           
    }

    //Updates week
    onWeek=(date)=>{
            
            let dayStart = moment(date).startOf('week')
            let dayEnd = moment(date).endOf('week')
            let numdays=[]
            let unparsed=[]
            
            while(dayStart <= dayEnd){
                unparsed.push(dayStart.toDate())
                let newDate=Date.parse(dayStart)
                let formatted=moment(newDate).format("MMMM D, YYYY")
                numdays.push(formatted);
                dayStart = dayStart.clone().add(1, 'd');
            }

            this.setState({
                startOfWeek: dayStart,
                endOfWeek: dayEnd,
                days:numdays,
                weekUnparsed:unparsed
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
            this.onWeek(date)
            this.setState({
                date:date,
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
        this.onWeek(moment().toDate())
        
    }
    onPrev=()=>{
        
        let prev_date = moment(this.state.date).clone().subtract(1, 'day').toDate()
        console.log('change to: ', prev_date)
        this.setState({
            date: prev_date
        })
        this.onWeek(prev_date)
        
    }

    onNext=()=>{
        
        let next_date = moment(this.state.date).clone().add(1, 'day').toDate()
        console.log('change to: ', next_date)
        this.setState({
            date: next_date
        })
        this.onWeek(next_date)
        
    }
    render(){

        const viewer=[
            {text:"DAY", key:"day", value:"day"},
            {text:"WEEK", key:"week", value:"week"}
        ]
        let currView
        if(this.state.view == 'week' ){
            currView = <SecretaryTable 
                            appointments={this.state.appointments}
                            week={this.state.weekUnparsed}
                        >
                        </SecretaryTable>
        }
        else if(this.state.view == 'day'){
            currView = <Trrial
                            day={this.state.date}
                            appointments={this.state.appointments}
                        >
                            
                        </Trrial>
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
                    startOfWeek={this.state.startOfWeek}
                    endOfWeek={this.state.endOfWeek}
                    daysParent={this.state.days}
                    weekUnparsed={this.state.weekUnparsed}
                    weekLength={this.state.days.length}
                >

                </SecretaryHeader>
                <div style={{height: 840+'px', margin:0+'px', overflowY:"auto"}}>
                {currView}
                </div>
                
                
            </>
        )
            
            
    }
}