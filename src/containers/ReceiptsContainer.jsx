import React, {useEffect } from 'react';
import { connect } from 'react-redux';
import {getReceipts} from '../actions/receiptsActions'
import Receipt from "../components/receipts/receipt"
import {useNavigate, useParams,Navigate} from 'react-router-dom';
import CreateReceipt from '../components/receipts/CreateReceipt';

const ReceiptsContainer = (props)=>{  
    let navigate = useNavigate()
    const {id} = useParams()
    const {user,loading} = props.user
    const {receipts} = props

    const goBack = (e) => {
        return navigate(-1)
    }
    useEffect(() => {
        props.getReceipts(id)
    } ,[]); 
    
    const displayImages=()=>{
            let receiptTotal = 0
            const receiptImages = receipts.map((receipt)=>{
                receiptTotal += receipt.amount
                return (
                  <div key={receipt.id} className='diplay-images' >
                    < Receipt  user={user} image_url={receipt.image_url} receipt={receipt}/>   
                  </div> 
                )      
            })

            return (
                <> 
                  {receiptImages}
                  <br></br>
                  <strong>Total = {receiptTotal}</strong>
                </>   
            ) 
    }

   return(
       <div>
            <div>
                <CreateReceipt user={user.user} workOrderId={id}/>
               {loading || user.is_login? displayImages(): <Navigate to='/login'/>}
            </div>
       </div>
   )
}



const mapStateToProps = state => { 
    return {
       receipts: state.receipts.receipts,
       user: state.user
    }
}
      
const mapDispatchToProps = dispatch => {
    return {
        getReceipts: (action) => dispatch(getReceipts(action))
    }
}   
      
export default connect(mapStateToProps,mapDispatchToProps  )(ReceiptsContainer)