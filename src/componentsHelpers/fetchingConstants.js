import { paths } from '../actions/actionsHelper';

export const CURRENT_USER_SETTER = {
      loading: "LOADING_USER", 
      type: 'ADD_USER',
      path: paths().checkLoginPath, 
      stateName: 'user'
}

export const BUILDINGS_SETTER = {
    loading: "LOADING_BUILDINGS", 
    type: 'ADD_BUILDINGS',
    path: paths().buildingsPath, 
    stateName: 'buildings'
}

export const WORKORDERS_SETTER = {
    loading: "LOADING_WORK_ORDERS",
    type: 'ADD_WORK_ORDERS',
    path: paths().workOrdersPath, 
    stateName: 'workOrders'
}

export const EMPLOYEES_SETTER = {
  loading: "LOADING_EMPLOYEES", 
  type: 'ADD_EMPLOYEES',
  path: paths().employeesPath, 
  stateName: 'employees'
}