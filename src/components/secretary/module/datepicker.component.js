import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendar} from '@fortawesome/free-solid-svg-icons'



import '../secretary_css/pickerStyle.scss'
import "react-datepicker/dist/react-datepicker.css"

export default class Picker extends Component {
    

    handleChangeDate=(date)=>{
        this.props.handleChangeDate(date)
    }
 
    render(){
         const{handleOnToday, handleOnPrev, handleOnNext, date} = this.props
        return(
            <div class="item">
                <div className="picker">
                    {/* <FontAwesomeIcon icon={faCalendar}  className="calendarIcon"/> */}
                    <DatePicker
                        selected={date}
                        onChange={this.handleChangeDate}
                        minDate={moment().toDate()}
                    />
                </div> 
                <div className="today" class="ui basic button with tooltip" data-title="Today (SPACEBAR)"
                    data-content="Moves focus date to today" data-variation="basic" data-position="bottom center"
                    id="today" onClick={handleOnToday} style={{fontWeight:"bolder", marginLeft: 30+'px'}}>
                    TODAY
                </div>
                <div class="ui icon basic buttons" style={{marginLeft: 30+'px'}}>
                    <div class="ui button with tooltip" data-title="Previous (←)"
                        data-content="Moves focused date to yesterday" data-position="bottom center" data-inverted=""
                        data-variation="basic" id="prev-button" onClick={handleOnPrev}>
                        <i class="angle left icon"></i>
                    </div>
                    <div class="ui button with tooltip" data-title="Next (→)" data-content="Moves focused date to tomorrow"
                        data-position="bottom center" data-inverted="" data-variation="basic" id="next-button" onClick={handleOnNext}>
                        <i class="angle right icon"></i>
                    </div>
                </div>
            </div>
        )
    }

}


