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


