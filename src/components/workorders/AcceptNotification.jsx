import React, {useState} from 'react';

import { connect } from 'react-redux';
import {editWorkOrder} from '../../actions/workOrdersActions'
import '../../styles/styles.css'
const AcceptNotification = (props) => {
    let {workOrder} = props


}



const mapDispatchToProps = dispatch => {
    return {
        editWorkOrder: (action) => dispatch(editWorkOrder(action))
    }
}   
      
export default connect(null, mapDispatchToProps)(CloseWorkOrder)