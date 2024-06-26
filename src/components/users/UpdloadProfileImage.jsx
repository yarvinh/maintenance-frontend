import {useState} from 'react';
import { connect } from 'react-redux';
import '../../styles/styles.css'
import {createImage,updateImage} from '../../actions/actionsProfileImages'
import imageCompression from 'browser-image-compression';

const UploadProfileImage = (props)=>{
    const {employeeOrUser} = props
    const {profile_image} = props.user
    const [image,setImage] = useState({
        image: ""
    })

    const handleOnChange= async (e)=>{
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }

        const formData = new FormData();    
        const compressedFile = await imageCompression(e.target.files[0], options);         
        formData.append("image",compressedFile);  
        setImage({
            image: formData,
        })
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault()
        e.target.children[0].files = null
        e.target.children[0].value = ""
        if(!profile_image && image.image !== "")
          props.createImage({path: `create_${employeeOrUser}_image`, image: image.image}) 
        else if(image.image !== "")
          props.updateImage({path: `update_${employeeOrUser}_image`, image: image.image}) 
        
        setImage({
            image: ""
        })
    }

    return (
        <form className="files-input"  onSubmit={handleOnSubmit}>    
            <input  onChange={handleOnChange} type="file"  name="profile_picture"/> 
            <button type='submit' className="white-blue-buttons">Save image</button>
        </form>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        createImage: (action) => dispatch(createImage(action)),
        updateImage: (action) => dispatch(updateImage(action))
    }
}   
      
export default connect(null, mapDispatchToProps)(UploadProfileImage)