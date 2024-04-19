// import { connect } from 'react-redux';
import {Link,useParams} from 'react-router-dom'

const Unit = (props)=>{
    const {id} = useParams()
    const {unit} = props

    return (     
      <>
        <Link to={`units/${unit?.id}`} ><button  className="unit" > {unit?.unit} </button></Link>
      </>
    )  

}


  
  export default Unit
