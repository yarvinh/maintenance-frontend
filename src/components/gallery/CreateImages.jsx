import {useState} from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import '../../styles/styles.css'
import { useParams} from 'react-router-dom';
import {createGalleryImages} from '../../actions/galleryActions'
import Uploading from '../Loading';
import imageCompression from 'browser-image-compression';
import ErrorsOrMsg from '../ErrosOrMsg';
import { compressImg } from '../../componentsHelpers/functionsHelpers';

const CreateImages=({user})=>{
    const {workOrderId} = useParams()
    const errorsOrMsg = useSelector(state => state.errorsOrMessages.errorsOrMessages)
    const uploading = useSelector(state => state.gallery.uploadingImages)
    const dispatch = useDispatch()
    const {id} = useParams()
    const [images,setImages] = useState({
        images: [] 
    })

    const handleOnChange =  (e)=>{
        const formData = new FormData(); 
        Array.from(e.target.files).forEach(async (file)=>{   
            const compressedFile = await imageCompression(file, compressImg(.1));      
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
        dispatch(createGalleryImages({images, id: id, workOrderId: workOrderId}))
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
                   <button type='submit' className="white-blue-buttons">Save image</button>

                   {/* {(errorsOrMessages.from === 'add_gallery_images') && <Errors errorsOrMessages={errorsOrMessages}/> } */}
                </form>
                {uploading && <Uploading/>}
                </div>
                  {errorsOrMsg.from === "add_gallery_images" && <ErrorsOrMsg errors={errorsOrMsg?.errors} msg={errorsOrMsg?.msg}/>}
                <div>
            </div>
        </div>
    )
}

export default CreateImages