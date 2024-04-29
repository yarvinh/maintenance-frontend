
const Errors = ({errorsOrMessages}) => {
    return(
      <div className="acordion">
            {errorsOrMessages.errors?.map((error, key) =>{ return <p key={key} className="errors acordion"><strong className="acordion">{error}</strong></p> })}
            {errorsOrMessages.msg?.map((error, key) =>{ return <p key={key} ><strong>{error}</strong></p> })}
      </div>
    )
}
 
export default Errors