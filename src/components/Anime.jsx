import '../styles/anime.css';

const Anime = (props)=>{
    return (
        <div>
            <div id="univers-container" className='univers'>
                <div className="sun">Sun</div>
                <div className="moon"></div>
            </div>
            <div className='diagonal-container'>
                <div className='diagonal-1'></div>
                <div className='diagonal-2'></div>

            </div>
        </div>

    )
}


export default Anime