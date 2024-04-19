export const date = (date) => {
    if (date){
        date = new Date(date.split('-').join("-").split("T")[0].replace(/-/g, '\/'))
      return date.toDateString()
    }
}