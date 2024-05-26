import NextButton from  './NextButton';
import BackButton from './BackButton';
import EditImages from './EditImages';

const ImgSlider=({gallery,user,index,setIndex})=>{
    if (gallery.length > 0 && gallery[index]){
        return  (            
          <div className='photo'>
            <img src={gallery[index].image_url} ></img> 
                {(user.admin || !user.admin) ? (gallery[index].employee?.id === user.user?.id) && <EditImages image={gallery[index]}/>: null}
                {index > 0 &&  <BackButton index={index} setIndex={setIndex} gallery={gallery}/>}
                {index < gallery.length -1 && <NextButton    index={index} setIndex={setIndex} gallery={gallery}/>}
            </div>
        )
    } else if ( gallery.length > 0 && gallery[index - 1]){
        setIndex(index - 1)
    }
}

export default ImgSlider