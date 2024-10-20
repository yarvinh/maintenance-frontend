import {useState} from 'react';
import {useDispatch } from 'react-redux';
import '../../styles/styles.css'
import { useParams} from 'react-router-dom';
import { patchFetchAction } from '../../actions/fetchActions';
import { editReceiptSetter } from '../../componentsHelpers/fetchingFunctions';
// import {updateReceipt,removeReceipt} from  '../../actions/receiptsActions'

const EditReceipt=({receipt})=>{
    const dispatch = useDispatch()
    const {workOrderId} = useParams()
    const [receiptValue,setReceiptValue] = useState({
        title: receipt.title,
        amount: receipt.amount  

    })

    const handleOnClick = (e) =>{
          let  message = "Are you sure you to remove this image"   
          const confirmBox = window.confirm(message)
        //   if (confirmBox === true ) 
             
            // props.removeReceipt(props.receipt.id) 
    }

    const handleOnChange=(e)=>{
        setReceiptValue({
            ...receiptValue,[e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault()
        const payload = editReceiptSetter({payload: {receipt: receiptValue}, workOrderId: workOrderId, id: receipt.id })
        dispatch(patchFetchAction(payload))
    }

    return(
        <div >
            <div>
                <form className="image-form" onSubmit={handleOnSubmit} >    
                   <input onClick={handleOnChange} onChange={handleOnChange} className="edit-receipt-inputs" placeholder="Description" name="title"  type="text" value={receiptValue.title}/><br/>
                   <input onChange={handleOnChange} className="edit-receipt-inputs" name="amount"  type="text" value={receiptValue.amount}/>
                   <button type='submit' hidden>Save</button>
                </form>            
            </div>
        </div>
    )

}
      
export default EditReceipt