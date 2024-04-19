
const BackButton=(props)=>{
    const {setIndex,index} = props
    const handleOnclick = (e)=>{
        if(index > 0)
            setIndex(index - 1)
    }

    return(
        // <React.Fragment >
            <button onClick={handleOnclick} name="previous" className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon img-button" name="next" aria-hidden="true"></span>
                <span className="visually-hidden img-button">Previous</span>
            </button>
        // </React.Fragment>
    )
}

export default BackButton