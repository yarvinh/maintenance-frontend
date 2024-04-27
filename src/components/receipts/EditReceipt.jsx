import React, {useState} from 'react';
import { connect } from 'react-redux';
import '../../styles/styles.css'
import { useParams} from 'react-router-dom';
import {updateReceipt,removeReceipt} from  '../../actions/receiptsActions'
import Errors from '../Errors';
const EditReceipt=(props)=>{

    const {title,amount} = props.receipt
    const {id} = useParams()
    const [receipt,setReceipts] = useState({
        title: title,
        amount: amount  

    })

    const handleOnClick = (e) =>{
        let message = ""
            message = "Are you sure you to remove this image"   
          const confirmBox = window.confirm(message)
          if (confirmBox === true ) {
            props.removeReceipt(props.receipt.id)
          }     
    }

    const handleOnChange=(e)=>{
        setReceipts({
            ...receipt,[e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault()
        props.updateReceipt({receipt: receipt, work_order_id: id, receipt_id: props.receipt.id})
    }

    return(
        <div >
            <div>
                <form className="image-form" onSubmit={handleOnSubmit} >    
                   <input onClick={handleOnChange} onChange={handleOnChange} className="edit-receipt-inputs" placeholder="Description" name="title"  type="text" value={receipt.title}/><br/>
                   <input onChange={handleOnChange} className="edit-receipt-inputs" name="amount"  type="text" value={receipt.amount}/>
                   <button type='submit' hidden>Save</button>
                   <Errors/>
                   {/* {props.errorsOrMessages.map((e,k) => {return <p key={k}>{e}</p>})} */}
                </form>            
            </div>
            <br/>
            <div onClick={handleOnClick} className='delete-image'>
                    <span >X</span> 
            </div>  
        </div>
    )

}

// const mapStateToProps = state => { 
//     return {
//         errorsOrMessages: state.errorsOrMessages.errorsOrMessages
//     }
// }
      
const mapDispatchToProps = dispatch => {
    return {
        updateReceipt: (action) => dispatch(updateReceipt(action)),
        removeReceipt: (action) => dispatch(removeReceipt(action)),
    }
}   
      
export default connect(null , mapDispatchToProps)(EditReceipt)