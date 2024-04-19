import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import {editWorkOrder} from '../../actions/workOrdersActions'
import '../../styles/styles.css'
const CloseWorkOrder = (props) => {
    const {id} = useParams()
    let {workOrder,workOrders} = props

    const workOrderStatus = () => {
        if (workOrder.status){
            return "Open Work Order"
           } else {
            return "Close Work Order"
           }
    }

    const buttonColor = () => {
        if (workOrder.status){
            return "inactive_color"
           } else {
            return "active_color"
           }
    }

    const handleOnClick = (e) => { 
        e.preventDefault()
       if (!workOrder.status){
        props.editWorkOrder({workOrders: workOrders, workOrder: {status: true, id: id}})
        e.target.value = "Open Work Order"
       } else {    
        props.editWorkOrder({workOrders: workOrders,workOrder: {status: false, id: id }})
        e.target.value = "Close Work Order"
       }
    }
    
    return (
        <div>
            <form onSubmit={handleOnClick}>
               <input  className={`work_order_button ${buttonColor()}`} type="submit" value={workOrderStatus()}/>
            </form>
        </div>
    )
}

const mapStateToProps = state => { 
    return {
      workOrder: state.workOrder.workOrder,
      workOrders: state.workOrders.workOrders,
    }
}



const mapDispatchToProps = dispatch => {
    return {
        editWorkOrder: (action) => dispatch(editWorkOrder(action))
    }
}   
      
export default connect(mapStateToProps , mapDispatchToProps)(CloseWorkOrder)