import {useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from "../components/gallery/Image"
import CreateImages from '../components/gallery/CreateImages';
import { useParams} from 'react-router-dom';
import ImgSlider from '../components/gallery/ImgSlider';
import { deleteFetchAction, getFetchAction } from '../actions/fetchActions';
import { galleryImageDeleteSetter, getGallerySetter } from '../componentsHelpers/fetchingFunctions';
import LoadingItems from '../components/LoadingItems';
import ErrorsOrMsg from '../components/ErrosOrMsg';

const GalleryContainer = ()=>{  
    const dispatch = useDispatch()
    const gallery = useSelector(state => state.gallery.gallery)
    const user = useSelector(state => state.user.user)
    const galleryLoading = useSelector(state =>  state.gallery.galleryLoading)
    const errorsOrMsg = useSelector(state => state.errorsOrMessages.errorsOrMessages)
    const {workOrderId} = useParams()
    const [index,setIndex] = useState(0)
    useEffect(() => {
        const payload = getGallerySetter({workOrderId: workOrderId })
        dispatch(getFetchAction(payload))
    } ,[]); 

    const handleOnclick = (e)=>{
        setIndex(parseInt(e.currentTarget.id))
    }
    const handleDeleteOnClick = (e) => {
        const payload = galleryImageDeleteSetter({workOrderId: workOrderId, id: gallery[index]?.id})
        const message = "Are you sure you to remove this image"   
        const confirmBox = window.confirm(message)
        if (confirmBox === true ) 
            dispatch(deleteFetchAction(payload))    
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
                <CreateImages user={user.user} workOrderId={workOrderId}/>
            </div>
            {errorsOrMsg.from === "gallery" && <ErrorsOrMsg errors={errorsOrMsg?.errors} msg={errorsOrMsg?.msg}/>}
            <div className='center hight'>
                {galleryLoading && <LoadingItems/>}
            </div>
            <div className="x-delete-container">
              {gallery[index]?.user?.id === user.user?.id || gallery[index]?.employee?.id === user.user?.id ? <img src="/close.svg" onClick={handleDeleteOnClick} className='x-delete-img' alt="X delete reply"/> : null}
            </div>
            <div className='center'>
              {gallery[index]?.user ?<strong> {gallery[index].user.name} </strong>: <strong> {gallery[index]?.employee.name}</strong>}
            </div>
            <div className='gallery-container'>
                <div className='slider-wrapper'>
                    <div className='slider'>
                      {user.is_login && <ImgSlider index={index} setIndex={setIndex} user={user} gallery={gallery}/>}
                    </div>
                </div>  
            </div>
            <div className='bar-container'>
                <div className='gallery-image'>
                  {galleryLoading  || user.is_login ? displayImages(): null}
                </div>
                <div className="center">
                  {gallery.length > 0 ?<strong>{gallery.length} images</strong>:null }
                </div>
            </div>
       </div>
   ) 
}

export default GalleryContainer