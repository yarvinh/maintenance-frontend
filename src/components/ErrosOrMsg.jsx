const ErrorsOrMsg = ({errors,msg})=>{
   if(errors){
      return(
         <div className="alert alert-danger accordion">
            {errors.map((e,index)=>{
              return <p key={index} className="accordion"><strong className={"accordion"}>{e}</strong></p>
            })}
         </div>
      )
   }else{
      return(
         <div className="alert alert-primary accordion">
            {msg.map((e,index)=>{
              return <p key={index} className={"accordion"}> <strong className={"accordion"}>{e}</strong> </p>
            })}
         </div>
      )
   }
}

export default ErrorsOrMsg