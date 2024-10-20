
const Errors = ({errorsOrMessages}) => {

    return(
      <div className="acordion">
            {errorsOrMessages?.map((error, key) =>{ return <p key={key} className="errors acordion"><strong className="acordion">{error}</strong></p> })}
            {/* {msg?.map((error, key) =>{ return <p key={key} ><strong>{error}</strong></p> })} */}
      </div>
    )
}
 
export default Errors