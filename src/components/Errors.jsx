
import { connect } from "react-redux"
import { useEffect } from "react"

const Errors = ({errorsOrMessages}) => {
    useEffect((e,b)=>{
      console.log(e,b)
    })

    return(
      <div className="acordion">
            {errorsOrMessages.errors?.map((error, key) =>{ return <p key={key} className="errors acordion"><strong className="acordion">{error}</strong></p> })}
            {errorsOrMessages.msg?.map((error, key) =>{ return <p key={key} ><strong>{error}</strong></p> })}
      </div>
    )
}

const mapStateToProps = state => { 
    return {
      errorsOrMessages: state.errorsOrMessages.errorsOrMessages
    }
}
   
export default connect(mapStateToProps, null)(Errors)