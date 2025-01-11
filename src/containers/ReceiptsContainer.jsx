import {useEffect } from 'react';
import Receipt from "../components/receipts/receipt"
import { useParams} from 'react-router-dom';
import CreateReceipt from '../components/receipts/CreateReceipt';
import { getFetchAction } from '../actions/fetchActions';
import { useDispatch, useSelector } from 'react-redux';
import { getReceiptsSetter } from '../componentsHelpers/fetchingFunctions';

const ReceiptsContainer = ()=>{  
    const dispatch = useDispatch()
    const receipts = useSelector(state => state.receipts.receipts)
    const user = useSelector(state => state.user.user)
    const {workOrderId} = useParams()
    useEffect(() => {
        const payload = getReceiptsSetter({id: workOrderId})
        dispatch(getFetchAction(payload))
    } ,[dispatch,workOrderId]); 
    
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
                  <strong>Total = {receiptTotal?.toFixed(2)?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</strong>
                </>   
            ) 
    }

   return(
       <div>
            <div>
                <CreateReceipt user={user.user} workOrderId={workOrderId}/>
                {displayImages()}
            </div>
       </div>
   )
}

      
export default ReceiptsContainer