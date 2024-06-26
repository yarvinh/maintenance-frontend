import React, {useState,useEffect } from 'react';
import { connect } from 'react-redux';
import {getImages} from '../actions/galleryActions'
import Image from "../components/gallery/Image"
import CreateImages from '../components/gallery/CreateImages';
import { useParams,Navigate} from 'react-router-dom';
import ImgSlider from '../components/gallery/ImgSlider';

const GalleryContainer = (props)=>{  

    const {id} = useParams()
    const {user,loading} = props.user
    const {gallery} = props
    const [index,setIndex] = useState(0)
    useEffect(() => {
       props.getImages(id)
    } ,[]); 

    const handleOnclick = (e)=>{
        setIndex(parseInt(e.currentTarget.id))
    }

    const displayImages=()=>{
        let count = 0
        return gallery.map((image)=>{
            count += 1
            return (
                <div onClick={handleOnclick} className={'carousel'} id={count-1} key={image.id}>
                  <Image index={index} id={count-1} gallery={gallery} user={user.user} image_url={image.image_url} image={image}/>  
                </div>
            )         
        })
    }
    
    return(
       <div className='main-gallery-component'>
            <div>
                <CreateImages user={user.user} workOrderId={id}/>
            </div>
            <div className='center'>
              {gallery[index]?.user ?<strong> {gallery[index].user.name} </strong>: <strong> {gallery[index]?.employee.name}</strong>}
            </div>

            <div className='gallery-container'>
                <div className='slider-wrapper'>
                    <div className='slider'>
                      {loading || user.is_login? <ImgSlider index={index} setIndex={setIndex} user={user} gallery={gallery}/>: <Navigate to='/login'/>}
                    </div>
                </div>  
            </div>
            <div className='bar-container'>
                <div className='gallery-image'>
                  {loading || user.is_login? displayImages(): <Navigate to='/login'/>}
                </div>
                <div className="center">
                  {gallery.length > 0 ?<strong>{gallery.length} images</strong>:null }
                </div>
            </div>
   
       </div>
   ) 
}

const mapStateToProps = state => { 
    return {
       gallery: state.gallery.gallery,
       user: state.user,
       loading: state.gallery.loading,
   
    }
}
      
const mapDispatchToProps = dispatch => {
    return {
        getImages: (action) => dispatch(getImages(action))
    }
}   
      
export default connect(mapStateToProps,mapDispatchToProps  )(GalleryContainer)