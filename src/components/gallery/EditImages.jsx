import { connect } from 'react-redux';
import '../../styles/styles.css'
import {updateGalleryImage,removeImage} from  '../../actions/galleryActions'

const EditImages=(props)=>{
    const {title} = props.image

    const handleOnClick = (e) =>{
        let message = ""
            message = "Are you sure you to remove this image"   
          const confirmBox = window.confirm(message)
          if (confirmBox === true ) {
            props.removeImage(props.image.id)
          }     
    }

    return(
        <div >
            <div >
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