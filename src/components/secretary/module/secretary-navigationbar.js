import React, {Component} from 'react';
import Picker from './secretary-date-picker'
import {Dropdown, Table} from 'semantic-ui-react'
import moment from 'moment'

import '../secretary_css/secretary-view.css'

export default class SecretaryNavigationbar extends Component{
    handleOnToday =()=>{
        this.props.onToday()
    }
    handleOnPrev =()=>{
        this.props.onPrev()
    }
    handleOnNext =()=>{
        this.props.onNext()
    }

    handleChangeDate=(date)=>{
        this.props.onChangeDate(date)
    }


    render(){

        let newDate = Date.parse(this.props.date)
        let formattedDate = moment(newDate).format("MMMM D, YYYY")

        
        return(
            <div class="ui top fixed sticky borderless menu" id="secretary-navigation-bar" style={{height:65+"px"}}>
            <div class="item" id="secretary-picker-container">
                <Picker id="secretary-picker"
                    handleChangeDate ={this.handleChangeDate}
                    handleOnToday ={this.handleOnToday}
                    handleOnPrev={this.handleOnPrev}
                    handleOnNext={this.handleOnNext}
                    date={this.props.date}

                />
            </div>
            <div class="item" id="secretary-date-text-container">
            <text style={{fontSize:20+'px'}} id="secretary-date-text">{formattedDate}</text>
            </div>
            <div class="right borderless menu" id="secretary-rightside">
                <div class="item" id="secretary-dropdown-view-container">
                    <Dropdown fluid selection 
                        placeholder="DAY"
                        name="view"
                        options={this.props.viewer} 
                        onChange={this.props.onChangeView}
                        defaultValue={this.props.viewer}
                        id="secretary-dropdown-view"
                        >
                    </Dropdown>
                </div>
                <div class="item" id="secretary-dropdown-filter-container">
                    <Dropdown placeholder="Filter" name="date" id="secretary-dropdown-filter">
                        <Dropdown.Menu>
                            <Dropdown.Item id="secretary-dropdown-filter-appointment">APPOINTMENTS</Dropdown.Item>
                            <Dropdown.Item id="secretary-dropdown-filter-availability">AVAILABILITY</Dropdown.Item>
                            <Dropdown.Item id="secretary-dropdown-filter-doctors">
                                <Dropdown placeholder="DOCTORS" options={this.props.doctors}>
                                </Dropdown>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div class="item" id="secretary-info-container">
                    <i id="shortcutsInfo" class="large info circle icon"></i>
                </div>
                <div class="item" id="secretary-logout-container">
                    <i id="logoutButton" class="large sign out icon link"></i>
                </div>
            </div>
        </div>

        )
    }
}