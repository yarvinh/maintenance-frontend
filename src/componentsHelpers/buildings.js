export const buildingsFilter = ({buildings,value}) => {
    return buildings.filter((item)=>{
        return item.address.toLowerCase().includes(value.toLowerCase()) 
        || item.super_name.toLowerCase().includes(value.toLowerCase())
    })
}