import React, { Component } from "react";
import styles from './App.module.scss';
import StatusHeadersContainer from './StatusHeadersContainer'
import EmployeeStatsContainer from './EmployeeStatsContainer'

export default class App extends Component {
    render() {
        return (
            <div className={styles.app}>
                <div className="page-content">
                    <StatusHeadersContainer />

                    <hr className={styles.line}/>
                    <EmployeeStatsContainer />
                </div>
            </div>
        );
    }
}
