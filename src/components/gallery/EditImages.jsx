import React, {useState} from 'react';
import { connect } from 'react-redux';
import '../../styles/styles.css'
import { useParams} from 'react-router-dom';
import {updateGalleryImage,removeImage} from  '../../actions/galleryActions'

const EditImages=(props)=>{
    const {title,message} = props.image
    const {id} = useParams()
    const [image,setImage] = useState({
        title: title || "",

    })

    const handleOnClick = (e) =>{
        let message = ""
            message = "Are you sure you to remove this image"   
          const confirmBox = window.confirm(message)
          if (confirmBox === true ) {
            props.removeImage(props.image.id)
          }     
    }

    const handleOnChange=(e)=>{
         setImage({
            ...image,[e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault()
        props.updateGalleryImage({gallery_image: image, work_order_id: id, gallery_image_id: props.image.id})
    }


    return(
        <div >

            <div >
                {/* <form className="image-form" onSubmit={handleOnSubmit} >    
                   <input onChange={handleOnChange}  name="title"  type="text" placeholder="Description" value={image.title}/>
                   {props.errorsOrMessages.map((e,k) => {return <p key={k}>{e}</p>})}
                </form> */}
                <div onClick={handleOnClick} className='delete-image'>
                    <span >X</span> 
                </div>      
                            
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
        updateGalleryImage: (action) => dispatch(updateGalleryImage(action)),
        removeImage: (action) => dispatch(removeImage(action))
    }
}   
      
export default connect(mapStateToProps , mapDispatchToProps)(EditImages)