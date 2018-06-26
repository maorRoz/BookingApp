import React, { Component } from "react";
import axios from 'axios';
import StatusHeader from './StatusHeader'

export default class StatusHeaderContainer extends Component {
    constructor(props){
        super(props);
        this.state= {
            roomAvailableNumber : 0,
            checkedInNumber : 0,
            reservedRoomsNumber : 0,
        };

    }
    componentDidMount(){
        axios.get('https://interview-booking-api.herokuapp.com/api/booking-snapshot').then(function(response){
            this.setState({
                roomAvailableNumber : response.data.availableRooms,
                checkedInNumber : response.data.checkedIn,
                reservedRoomsNumber : response.data.reservedRooms,
            });
        }.bind(this));
    }
    render() {
        return (
            <div>
                <StatusHeader number={this.state.roomAvailableNumber} description="Rooms available" marginLeft="400px" position='left'/>
                <StatusHeader number={this.state.reservedRoomsNumber} description="Reserved rooms" marginLeft="350px" position='left' />
                <StatusHeader number={this.state.checkedInNumber} description="Checked in" marginLeft="250.0px" position='left' />
            </div>
        );
    }
}
