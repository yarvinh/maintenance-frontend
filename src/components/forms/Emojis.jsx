
import happyFace from "./photos/happy.png"
import './style.css';
import { useState} from "react";
import { OriginalSmileys } from "./consts/emojis";

const Emojis = ({handleOnEmoji}) =>{
    const [displayEmojis, setDisplayEmojis] = useState(false)
    const handleOnClick = (e)=>{
        setDisplayEmojis(prev => !prev)  
    }

    return(
        <section  >
            <button onClick={handleOnClick} className={`emojis`} type="button"> 
              <img src={happyFace} className={`emojis-img`} alt="smyling emoji" ></img>
            </button>
            <div  className={ displayEmojis ? 'emojis-wraper display': "display-none" }>
                {OriginalSmileys().map((emoji,index)=>{
                    return <button key={index} onClick={handleOnEmoji} type="button" className="emojis display" name="reply" value={String.fromCodePoint( emoji )}>{String.fromCodePoint( emoji )}</button> 
                })}
            </div>
        </section>
    )
}

export default Emojis