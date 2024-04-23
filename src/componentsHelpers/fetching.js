import { paths } from '../actions/actionsHelper';

// export const  fetchAppContent = (getFetchAction)=>{

      // getFetchAction({
      //   loading: "LOADING_WORK_ORDERS", 
      //   type: 'ADD_WORK_ORDERS',
      //   path: paths().workOrdersPath, 
      //   stateName: 'workOrders'
      // })
      // getFetchAction({
      //   loading: "LOADING_BUILDINGS", 
      //   type: 'ADD_BUILDINGS',
      //   path: paths().buildingsPath, 
      //   stateName: 'buildings'
      // })
      // getFetchAction({
      //   loading: "LOADING_EMPLOYEES", 
      //   type: 'ADD_EMPLOYEES',
      //   path: paths().employeesPath, 
      //   stateName: 'employees'
      // })
// }
export const fetchCurrentUser = (getFetchAction)=>{
    getFetchAction({
      loading: "LOADING", 
      type: 'ADD_USER',
      path: paths().checkLoginPath, 
      stateName: 'user'
    })
}