import { useRef } from 'react';
import './style.css';

const ImagesCarousel = ({images}) => {
    const prev = useRef()
    const handleOnClick = (e)=> {
        if(e.target.className.includes("onclick") ){
           prev.current.style.backgroundColor = "black"
           prev.current = e.target
           e.target.style.backgroundColor = "blue"
        }
    }

    const handleOnMouseOver = (e)=>{
        let prevElementId = '0'
        const currentElementId = e.target.id.split("-")[1]
         
        if(e.relatedTarget?.className.includes("is-here"))
          prevElementId = e.relatedTarget.id?.split("-")[1]

        const prevElement = document.getElementById(`slider-nav-${prevElementId}`)
        const currentElement = document.getElementById(`slider-nav-${currentElementId}`)
        currentElement.style.backgroundColor = "blue";
        prev.current = currentElement

        if(e.relatedTarget?.className.includes("is-here") && prevElement)
          prevElement.style.backgroundColor = "black";
       
    } 

   return(
    <section>
        <div className="images-conainer">
           <div className="slider-wrapper">
            <div  className="slider">
                 {images.map((img,index)=>{
                     return (
                        <img {...(images.length > 1  && {onMouseOver: handleOnMouseOver })}   src={img.image_url} id={`slider-${img.id}`} className="chat-img is-here" key={index} alt="reply image"/>
                     )
                 })}
            </div>
           </div>
        </div>
        <div className="slider-nav">
            {images.length > 1 && images.map((image,index)=>{
               return(
                  <a ref={prev} onClick={handleOnClick}  key={index} className="onclick"  id={`slider-nav-${image.id}`} href={`#slider-${image.id}`}/>
               )
            })}
        </div>
    </section>
   )
}

export default ImagesCarousel

