import {useState} from 'react';
import { connect } from 'react-redux';
import '../../styles/styles.css'
import { useParams} from 'react-router-dom';
import {createGalleryImages} from '../../actions/galleryActions'
import Errors from '../Errors';
import Uploading from '../Loading';
import imageCompression from 'browser-image-compression';

const CreateImages=(props)=>{
    const {user,errorsOrMessages,uploading} = props
    const {id} = useParams()
    const [images,setImages] = useState({
        images: [] 
    })

    const handleOnChange =  (e)=>{
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
          }
    
        const formData = new FormData(); 
        Array.from(e.target.files).forEach(async (file)=>{   
            const compressedFile = await imageCompression(file, options);      
            formData.append("file[]", compressedFile);  
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
                   {errorsOrMessages.from === 'add_gallery_images' ? <Errors errorsOrMessages={errorsOrMessages}/> : null}
                </form>
                {uploading && errorsOrMessages.from !== 'add_gallery_images'? <Uploading/>: null}
            </div>
        </div>
    )
}

const mapStateToProps = state => { 
    return {
        errorsOrMessages: state.errorsOrMessages.errorsOrMessages,
        uploading: state.gallery.uploading
    }
}
      
const mapDispatchToProps = dispatch => {
    return {
        createGalleryImages: (action) => dispatch(createGalleryImages(action))
    }
}   
      
export default connect(mapStateToProps, mapDispatchToProps)(CreateImages)