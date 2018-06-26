import React, { Component } from "react";
import styles from './App.module.scss';
import EmployeeStats from './EmployeeStats'
import axios from 'axios';

export default class EmployeeStatsContainer extends Component {
    constructor(props){
        super(props);
        this.state= {
            firstBestEmployee: {},
            secondBestEmployee: {},
            thirdBestEmployee: {}
        }

    }

    componentDidMount(){
        axios.get('https://interview-booking-api.herokuapp.com/api/bookings').then(function(response){
            console.log(response.data);
            let threeBestEmployees = this.getBestEmployees(response.data);
            console.log(threeBestEmployees);
            this.setState({
                firstBestEmployee: {
                   name: threeBestEmployees[0].name,
                   icon: threeBestEmployees[0].icon,
                   hours: threeBestEmployees[0].hours
                },
                secondBestEmployee: {
                    name: threeBestEmployees[1].name,
                    icon: threeBestEmployees[1].icon,
                    hours: threeBestEmployees[1].hours
                 },
                 thirdBestEmployee: {
                    name: threeBestEmployees[2].name,
                    icon: threeBestEmployees[2].icon,
                    hours: threeBestEmployees[2].hours
                 }
            })
        }.bind(this));
    }

    getBestEmployees(bookings){
        let employeesWithHours = this.getAllEmployeesWithHours(bookings);
        let threeBestEmployees = []
        for(let i=0;i<3;i++){
            let bestEmployee = employeesWithHours.reduce((previousEmployee, currentEmployee) =>
             (previousEmployee.hours > currentEmployee.hours)
             ? previousEmployee : currentEmployee);
            threeBestEmployees.push(bestEmployee);
            employeesWithHours= employeesWithHours.filter(employee => employee.id !== bestEmployee.id);
        }
        return threeBestEmployees;
    }

    getAllEmployeesWithHours(bookings){
        let employees = [];
        bookings.forEach(booking => {
            let hoursSold = this.getHoursSold(booking.checkOutDate,booking.checkInDate);
            let updated = false;
            employees.forEach(employee =>{
                if(employee.id === booking.employee.id){
                    updated = true;
                    employee.hours+= hoursSold;
                }
            })
            if(!updated){
                employees.push({
                    id: booking.employee.id,
                    name: booking.employee.firstName + " " +booking.employee.lastName,
                    icon: booking.employee.profileImageUrl,
                    hours: hoursSold
                })
            }
        });
        return employees;
    }

    getFixedDate(inputDate){
        let fixedDate = inputDate.split("-");
        return new Date(fixedDate[1] +"/"+ fixedDate[0] +"/"+fixedDate[2]);
    }

    getHoursSold(checkOutDate,checkInDate){
        let endDate = this.getFixedDate(checkOutDate);
        let startDate = this.getFixedDate(checkInDate);
        let endDays = Math.floor(endDate.getTime() / (3600 * 24 * 1000));
        let startDays = Math.floor(startDate.getTime() / (3600 * 24 * 1000));
        let daysDiff = endDays - startDays;
        return daysDiff * 24;
    }
    render() {
        return (
            <div>
               <div className={styles.employee_stats}> Employee stats </div>
               <EmployeeStats data={this.state.firstBestEmployee} />
               <EmployeeStats data={this.state.secondBestEmployee} />
               <EmployeeStats data={this.state.thirdBestEmployee} />
            </div>
        );
    }
}
