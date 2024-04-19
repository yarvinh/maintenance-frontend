import React, {useState} from 'react';
import { connect } from 'react-redux';
import '../../styles/styles.css'
import { useParams} from 'react-router-dom';
import {createReceipts} from '../../actions/receiptsActions'

const CreateReceipt=(props)=>{
    const {user} = props
    const {id} = useParams()
    const [receipts,setReceipts] = useState({
        receipts: [] 
    })

    const handleOnChange=(e)=>{
        const formData = new FormData(); 
        Array.from(e.target.files).forEach((file)=>{             
            formData.append("file[]", file);  
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
                   <button type='submit' className="imgs-button">Save image</button>
                   {props.errorsOrMessages.map((e,k) => {return <p key={k}>{e}</p>})}
                </form>
            </div>
        </div>
    )

}

const mapStateToProps = state => { 
    return {
        errorsOrMessages: state.errorsOrMessages.errorsOrMessages
    }
}
      
const mapDispatchToProps = dispatch => {
    return {
        createReceipts: (action) => dispatch(createReceipts(action))
    }
}   
      
export default connect(mapStateToProps , mapDispatchToProps)(CreateReceipt)