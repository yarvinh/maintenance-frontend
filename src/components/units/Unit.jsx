
import {Link} from 'react-router-dom'

const Unit = (props)=>{
    const {unit} = props
    return (     
      <>
        <Link to={`units/${unit?.id}`} ><button  className="unit" > {unit?.unit} </button></Link>
      </>
    )  
}


  
  export default Unit
