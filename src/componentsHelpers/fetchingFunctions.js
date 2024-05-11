
export const buildingSetter=(id)=>{
  return {
    loading: "LOADING_BUILDING", 
    type: 'ADD_BUILDING',
    path: `/buildings/${id}`, 
    stateName: 'building'
  }
}