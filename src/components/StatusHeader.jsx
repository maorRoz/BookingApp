import React, { Component } from "react";
import styles from './App.module.scss';
export default class StatusHeader extends Component {
    render() {
        return (
            <div  style={{display: 'inline-block', marginLeft: this.props.marginLeft , float: this.props.position}}>
                <div className={styles.layer} >{this.props.number}</div>
                <div className={styles.layer_description}>{this.props.description}</div>
            </div>
        );
    }
}
