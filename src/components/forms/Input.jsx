import { useRef, useState } from "react";
import { useDispatch} from "react-redux";
import imageCompression from 'browser-image-compression';
import Emojis from "./Emojis";
import './style.css';
import { v4 as uuidv4 } from 'uuid';
import { compressImg } from "../../componentsHelpers/functionsHelpers";
import { dispatchComment } from "../../actions/comments";
import { postFetchAction } from "../../actions/fetchActions";


const Input = ({submitButton, ids, createAction, name, path, upLoadImages}) => {
    const dispatch = useDispatch()
    const [inputValue, setInputValue] = useState("")
    const [imageUrl, setImageUrl] = useState([])
    const imagesPayload = useRef([])
    
    const handleOnImg = (e) =>{
        const imgsArray = Array.from(e.target.files)
        imgsArray.forEach(async (file)=>{   
            const compressedFile = await imageCompression(file, compressImg(.1));  
            const imgUrl = URL.createObjectURL(compressedFile)
            setImageUrl(prev => [...prev, imgUrl])
            imagesPayload.current.push(compressedFile)
        })
    }
 
    const handleOnChange = (e)=>{
        if(e.which === 13 && !submitButton)
          e.preventDefault()
        e.target.style.height = "1px";
        e.target.style.height = (e.target.scrollHeight)+"px";
        setInputValue(e.target.value,)
    }

    const handleOnKeyUp = (e)=>{
        if (e.code  === 'Enter' && !submitButton){
            dispatch(createAction({[name]: {...ids,[name]: inputValue},path: path}))
            setInputValue('')
            setImageUrl([])
            e.target.style.height = "1px";  
        }
    }

    const handleOnEmoji=(e)=>{
        setInputValue(pre => `${pre} ${e.target.value}`)
    }

    const handleOnSubmit = (e)=>{
        e.preventDefault()
        const formData = new FormData(); 
        imagesPayload.current.forEach(async file => formData.append("images[]", file) )
        dispatch( dispatchComment({
            payload: formData ,
            [name]: {...ids, [name]: inputValue},
            path: path
        }))
        imagesPayload.current = []
        setImageUrl([])
        setInputValue('')
    }

    const handleOnClickRemove = (e) =>{
        imagesPayload.current.splice(e.target.name, 1)
        const modifiedImgsUrl = imagesPayload.current.map(img => URL.createObjectURL(img))
        setImageUrl( modifiedImgsUrl);
    }

    return(
            <form className="reply-form" onSubmit={handleOnSubmit} onKeyUp={handleOnKeyUp} >
                {imageUrl.length > 0 && <div className="payload-images">
                    {imageUrl.map((url,index)=>{
                        return (
                            <div className="image-frame" key={uuidv4()}>
                                <img src="../close.svg" onClick={handleOnClickRemove} name={index} className='delete-image' alt="X delete reply"/>
                                <img id="blah"  className="comment-and-reply-image" src={url} alt="your image" /> 
                            </div>
                        )
                    })}
                </div>}
                <textarea  onKeyPress={handleOnChange} onChange={handleOnChange} rows="1" className="reply-input comment-input" value={inputValue}></textarea> 
                {submitButton && <input className="comment-submit-button" type="submit" value="Submit"/>}
                <div className="text-area-emojis-container">
                    {upLoadImages && <div className="input-container">
                        <input onChange={handleOnImg} name="images"   multiple className='input-file' type="file" accept="image/png, image/jpeg"/>
                    </div>}
                    <Emojis itemId={ids.work_order_id} handleOnEmoji={handleOnEmoji}/>
                </div> 
            </form> 
    )
}

export default Input