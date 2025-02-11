export const addItemToArray = ({array, item})=>{
    return array.unshift(item)
    // return array.push(item)
}

export const editItemFromArray = ({array,item})=>{
   const itemIndex = array.findIndex(i => i.id === item.id)
   if (itemIndex >= 0){
    array[itemIndex] = item
   }
   
   return array
}

export const deleteItemFromArray = ({array,id})=>{
    const itemIndex = array.findIndex((i) => {
      return i.id === id
    })

    if(itemIndex !== -1)
      array.splice(itemIndex,1)

    return array
}

export const findIndexById = ({array,id})=>{
  const index = array.findIndex(i => i.id === id)
  if(index !== -1)
     return index
  else
     return false
}

export const findItemById = ({array,id})=>{
  const item = array.find(i => i.id === parseInt(id,10))
  return item
}


export const reverseByDate=(array, date) => {
  return array?.reverse((a,b) =>{
    return new Date(a[date]) - new Date(b[date])
  })
}


  export  const calculateTotal = (objArray, propertyName)  => {
        return objArray.reduce((accumulator, current) => accumulator + current[propertyName], 0)
           .toFixed(2)
  };



