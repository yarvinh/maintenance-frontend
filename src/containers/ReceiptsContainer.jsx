import React, {useEffect } from 'react';
import { connect } from 'react-redux';
import {getReceipts} from '../actions/receiptsActions'
import Receipt from "../components/receipts/receipt"
import {useNavigate, useParams,Navigate} from 'react-router-dom';
import CreateReceipt from '../components/receipts/CreateReceipt';
import Loading from '../components/Loading'
const ReceiptsContainer = (props)=>{  
    let navigate = useNavigate()
    const {id} = useParams()
    const {user,loading} = props.user
    const {receipts,uploading} = props

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
            </div>
            {uploading? <Loading/>:null}
            <div>
               {loading || user.is_login? displayImages(): <Navigate to='/login'/>}
            </div>
            <br></br>
            <br></br>
            <br></br>
            <button  onClick={goBack}  className="back-button"> {"<< Back"} </button>
            <br></br>
            <br></br>
       </div>
   )
}



const mapStateToProps = state => { 
    return {
       receipts: state.receipts.receipts,
       user: state.user,
       uploading: state.receipts.uploading
    }
}
      
const mapDispatchToProps = dispatch => {
    return {
        getReceipts: (action) => dispatch(getReceipts(action))
    }
}   
      
export default connect(mapStateToProps,mapDispatchToProps  )(ReceiptsContainer)