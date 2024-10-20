import {useState} from 'react';
import { useDispatch } from 'react-redux';
import '../../styles/styles.css'
import {createImage,updateImage} from '../../actions/actionsProfileImages'
import imageCompression from 'browser-image-compression';
import { compressImg } from '../../componentsHelpers/functionsHelpers';

const UploadProfileImage = ({employeeOrUser,user})=>{
    const dispatch = useDispatch()
    const {profile_image} = user
    const [image,setImage] = useState({
        image: ""
    })

    const handleOnChange= async (e)=>{
        const formData = new FormData();    
        const compressedFile = await imageCompression(e.target.files[0], compressImg(.1));         
        formData.append("image",compressedFile);  
        setImage({image: formData})
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault()
        e.target.children[0].files = null
        e.target.children[0].value = ""
        if(!profile_image && image.image !== "")
          dispatch(createImage({path: `create_${employeeOrUser}_image`, image: image.image}))
        else if(image.image !== "")
          dispatch(updateImage({path: `update_${employeeOrUser}_image`, image: image.image}))
        
        setImage({image: ""})
    }

    return (
        <form className="files-input"  onSubmit={handleOnSubmit}>    
            <input  onChange={handleOnChange} type="file"  name="profile_picture"/> 
            <button type='submit' className="white-blue-buttons">Save image</button>
        </form>
    )
}
     
export default UploadProfileImage