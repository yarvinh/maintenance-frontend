import {useState} from 'react';
import { connect } from 'react-redux';
import '../../styles/styles.css'
import { useParams} from 'react-router-dom';
import {createGalleryImages} from '../../actions/galleryActions'
import Errors from '../Errors';
import Uploading from '../Loading';

const CreateImages=(props)=>{
    const {user} = props
    const {id} = useParams()
    const [images,setImages] = useState({
        images: [] 
    })

    const handleOnChange=(e)=>{
        const formData = new FormData(); 
        Array.from(e.target.files).forEach((file)=>{             
            formData.append("file[]", file);  
        })

        setImages({
            [e.target.name]: formData,
            employee_id: user.admin ? "" : user.id 
        })
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault()
        e.target.children[0].files = null
        e.target.children[0].value = ""
        props.createGalleryImages({images: images, id: id})
        setImages({
            images: []
        })
    }

    return(
        <div >
            <div>
                <form  onSubmit={handleOnSubmit}>    
                   <input  onChange={handleOnChange} type="file" multiple name="images" className="imgs-input"  />
                   <br></br>
                   <button type='submit' className="imgs-button">Save image</button>
                   <Uploading/>
                   <Errors/>
                   {/* {props.errorsOrMessages.errors?.map((e,k) => {return <p key={k}>{e}</p>})} */}
                </form>
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
        createGalleryImages: (action) => dispatch(createGalleryImages(action))
    }
}   
      
export default connect(null , mapDispatchToProps)(CreateImages)