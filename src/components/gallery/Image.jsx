
const Image = (props)=>{
    const {image_url,index,id} = props
    
    const style = ()=>{
        if(index === id){
            const element = document.getElementById(index)
            element?.scrollIntoView()
            return {
                'borderWidth': '3px',
                'borderStyle': 'solid',
                'borderColor':  '#0D6EFD',
                'borderRadius': '.6rem',
                'opacity': '.70' 
            } 
        } else {
            return {'borderRadius': '.5rem'}
        }
    }

    return (
      <>
        <div style={style()} className='image-container'>    
         <img src={image_url}  ></img> 
        </div>
      </>
    )
  };

  export default Image