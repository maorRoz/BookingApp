import React, { Component } from "react";
import styles from './App.module.scss';
export default class EmployeeStats extends Component {
    render() {
        return (
            <div>
                <img className={styles.bitmap} alt="#employee_picutre" style={{display: 'inline-block'}} src={this.props.data.icon}></img>
                <div className={styles.employeeName} style={{display: 'inline-block'}} >{this.props.data.name}</div>
                <div className={styles.employeeHours} style={{display: 'inline-block'}} >{this.props.data.hours} hours</div>

            </div>
        );
    }
}
