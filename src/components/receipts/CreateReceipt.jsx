import  {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams} from 'react-router-dom';
import {createReceipts} from '../../actions/receiptsActions'
import imageCompression from 'browser-image-compression';
import { compressImg } from '../../componentsHelpers/functionsHelpers';
import ErrorsOrMsg from '../ErrosOrMsg';

const CreateReceipt=()=>{
    const dispatch = useDispatch()
    const errorsOrMsg = useSelector(state => state.errorsOrMessages.errorsOrMessages)
    const user = useSelector(state => state.user.user)
    // const loading = useSelector(state => state.receipts.receiptsLoading)
    const {workOrderId} = useParams()
    const [receipts,setReceipts] = useState({
        receipts: [] 
    })

    const handleOnChange=(e)=>{
        const formData = new FormData(); 
        Array.from(e.target.files).forEach( async (file)=>{    
            const compressedFile = await imageCompression(file, compressImg(.1));  
            formData.append("file[]", compressedFile);  
        })

        setReceipts({
            [e.target.name]: formData,
            employee_id: user.admin ? "" : user.id 
        })
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault()
        e.target.children[0].files = null
        e.target.children[0].value = ""
        dispatch(createReceipts({receipts, id: workOrderId}))
        setReceipts({
            receipts: []
        })
    }

    return(
        <div className="receipt-container">
            <div>
                <form  onSubmit={handleOnSubmit}>    
                   <input  onChange={handleOnChange} type="file" multiple name="receipts" className='imgs-input' />
                   <br></br>
                   <button type='submit' className="white-blue-buttons">Save image</button>
                </form>
                </div>
                  {errorsOrMsg.from === "add_receipts" && <ErrorsOrMsg errors={errorsOrMsg?.errors} msg={errorsOrMsg?.msg}/>}
                <div>
            </div>
        </div>
    )
}
  
export default CreateReceipt