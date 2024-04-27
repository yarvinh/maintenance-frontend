// import React, {useState,useEffect } from 'react';

const NextButton=(props)=>{
    const {setIndex, gallery,index} = props
    const handleOnclick = (e)=>{
        if(index + 1 < gallery.length)
            setIndex(index + 1)
    }

    return(
        <button onClick={handleOnclick} name="next"className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon img-button" name="next" aria-hidden="true"></span>
            <span className="visually-hidden img-button">Next</span>
        </button>
    )
}

export default NextButton