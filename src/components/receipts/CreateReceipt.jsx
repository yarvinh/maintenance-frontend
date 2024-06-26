import  {useState} from 'react';
import { connect } from 'react-redux';
import { useParams} from 'react-router-dom';
import {createReceipts} from '../../actions/receiptsActions'
import imageCompression from 'browser-image-compression';
import Errors from '../Errors';
import Loading from '../Loading'

const CreateReceipt=(props)=>{
    const {user,errorsOrMessages,uploading} = props
    const {id} = useParams()
    const [receipts,setReceipts] = useState({
        receipts: [] 
    })

    const handleOnChange=(e)=>{
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }
        const formData = new FormData(); 
        Array.from(e.target.files).forEach( async (file)=>{    
            const compressedFile = await imageCompression(file, options);  
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
        props.createReceipts({receipts: receipts, id: id})
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
                   {(errorsOrMessages.from === "add_receipts") && <Errors errorsOrMessages={errorsOrMessages}/>}
                </form>
                </div>
                  {uploading && (errorsOrMessages.from !== "add_receipts") && <Loading/>}
                <div>
            </div>
        </div>
    )

}

const mapStateToProps = state => { 
    return {
        errorsOrMessages: state.errorsOrMessages.errorsOrMessages,
        uploading: state.receipts.uploading
    }
}
      
const mapDispatchToProps = dispatch => {
    return {
        createReceipts: (action) => dispatch(createReceipts(action))
    }
}   
      
export default connect(mapStateToProps , mapDispatchToProps)(CreateReceipt)