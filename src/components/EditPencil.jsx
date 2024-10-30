import { useState } from "react"

const EditPencil = ({editMode,setEditMode}) => {
   

    const handleOnEdit = (e) => {
        setEditMode((prev) => {  
            return !prev
        })
    }

    return (
        <button onClick={handleOnEdit} className='unit-button'> {editMode ? "Close" : <img src='/pencil_1.png' className='pencil' alt="Edit"/>} </button>   
    )
}


export default EditPencil