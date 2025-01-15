import { useState } from "react"

const ToolTip = ({children}) => {
    const [displayAnswer, setDisplayAnswer] = useState(false)

    const handleOnClickQuestion = (e) =>  setDisplayAnswer((prev)=> !prev)
    const handleDeleteOnClick = (e) => setDisplayAnswer((prev)=> false)
    return (
        <span className="tool-tip-container"> 
            <button onClick={handleOnClickQuestion} className="question-button">?</button>
            {displayAnswer && <div className="tool-tip">
               <img src="../../close.svg" onClick={handleDeleteOnClick} className='x-delete' alt="X delete reply"/>
               {children}
            </div>}
        </span>
    )
}

export default ToolTip