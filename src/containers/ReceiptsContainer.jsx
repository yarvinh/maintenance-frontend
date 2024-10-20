import {useEffect } from 'react';
import Receipt from "../components/receipts/receipt"
import {useNavigate, useParams,Navigate} from 'react-router-dom';
import CreateReceipt from '../components/receipts/CreateReceipt';
import { getFetchAction } from '../actions/fetchActions';
import { useDispatch, useSelector } from 'react-redux';
import { getReceiptsSetter } from '../componentsHelpers/fetchingFunctions';

const ReceiptsContainer = ()=>{  
    const dispatch = useDispatch()
    const receipts = useSelector(state => state.receipts.receipts)
    const user = useSelector(state => state.user.user)
    const loading = useSelector(state => state.receipts.receiptsLoading)
    let navigate = useNavigate()
    const {workOrderId} = useParams()
    // console.log(receipts)
    const goBack = (e) => {
        // return navigate(-1)
    }
    useEffect(() => {
        const payload = getReceiptsSetter({id: workOrderId})
        dispatch(getFetchAction(payload))
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
                <CreateReceipt user={user.user} workOrderId={workOrderId}/>
                {displayImages()}
               {/* {loading || user.is_login? displayImages(): <Navigate to='/login'/>} */}
            </div>
       </div>
   )
}

      
export default ReceiptsContainer