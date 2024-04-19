export const workOrderStatus = (workOrder) => {
    const today = new Date()
    if (new Date(workOrder.date) < today && !workOrder.status && new Date(workOrder.date).toDateString() !== today.toDateString()){
       return <p style={{color: "red"}}>Expired</p>
    } else if (!workOrder.status){
       return <p style={{color: "orange"}}>Pending</p>
    } else if (workOrder.status){
        return <p style={{color: "green"}}>Closed</p>
    }
  }

  export const statusForMobiles = (workOrder) => {
   const today = new Date()
   if (new Date(workOrder.date) < today && !workOrder.status && new Date(workOrder.date).toDateString() !== today.toDateString()){
      return "expire"
   } else if (!workOrder.status){
      return "pending"
   } else if (workOrder.status){
       return "closed"
   }
 }


 export const currentUserWorkOrders=(payload)=>{
   const {workOrders,user} = payload
   return !user.admin 
   ?
     workOrders.filter(w =>  w.tickets?.find(ticket => ticket.employee_id === user.user.id)) 
   :
     workOrders
 }


 export const pendingUserWorkOrders=(payload)=>{
   const {workOrders,user} = payload
   if (!user.admin ){
     return workOrders.filter(w =>  w.tickets?.find(ticket => ticket.employee_id === user.user.id ) && !w.status )
   }else{
     return workOrders.filter(w =>  !w.status)
   }
 }





export const getSearchWorkOrders=({value,workOrdersArr})=>{
  return workOrdersArr.filter((item)=>{
       return (
         new Date(item.date.split('-').join("-").split("T")[0].replace(/-/g, '\/')).toLocaleDateString().includes(new Date(value).toLocaleDateString())
         || item.title.toLowerCase().includes(value.toLowerCase()) 
         || !!item.employees.find(employee=>employee.name.toLowerCase().includes(value.toLowerCase()))
         || item.building?.address.toLowerCase().includes(value.toLowerCase())
         || item.unit.toLowerCase().includes(value.toLowerCase()) 
       )   
   })
}


export const workOrderSelector = ({workOrders,filterBy})=>{
  const today = new Date()
      if (filterBy === "expire" ){
      return workOrders.filter((workOrder)=>{
          return new Date(workOrder.date) < today && !workOrder.status && new Date(workOrder.date).toDateString() !== today.toDateString()
      })

      } else if (filterBy === 'pending'){
        return  workOrders.filter((workOrder)=>{
          return (!workOrder.status && new Date(workOrder.date) > today) || (!workOrder.status &&  new Date(workOrder.date).toDateString() === today.toDateString())
        })

      } else if (filterBy === 'closed'){
          return  workOrders.filter((workOrder)=>{
              return workOrder.status
          })
      } else if(filterBy === "today"){
          return workOrders.filter(workOrder => new Date(workOrder.date.split('-').join("-").split("T")[0].replace(/-/g, '\/')).toDateString() === today.toDateString())
      } else {
          return workOrders
      }
}





