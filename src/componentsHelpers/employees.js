export const employeesFilter = ({employees,value})=>{
    return  employees.filter((employee)=>{
        return employee.email.toLowerCase().includes(value.toLowerCase()) 
        || employee.name.toLowerCase().includes(value.toLowerCase()) 
        || employee.phone.includes(value) 
      })
}