import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

const NewUserNotification = ({user,buildings,employees})=>{
        const newUserNotifications=()=>{
            if (user.is_login  && employees.length < 1  && user.is_login  &&  buildings.length < 1 ){
              return <p className='notifications'>Create an {<Link to='employees'>employee</Link> } and a {<Link to ="/buildings">building</Link>} first to create a work order</p>
            } else if (user.is_login  && employees.length < 1 ){
              return <p className='notifications'>Create an {<Link to='employees'>employee</Link>} first to create a work order</p>
            }else if(user.is_login  &&  buildings.length < 1){
              return <p className='notifications'>Create a {<Link to ="/buildings">building</Link>} first to create a work order</p>
            }
          }
        
    return (
        <div>
            {newUserNotifications()}
        </div> 
    )
}


const mapStateToProps = state => { 
    return {
      employees: state.employees.employees,
      user: state.user.user,
      buildings: state.buildings.buildings,
      workOrders: state.workOrders.workOrders,
    }
  }
   
  
  export default connect(mapStateToProps, null)(NewUserNotification )