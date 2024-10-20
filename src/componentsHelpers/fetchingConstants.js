import { paths } from '../actions/actionsHelper';
import { buildingsLoading, buildingsReceived } from '../state/reducers/buildingsReducer';
import { employeesLoading, employeesReceived } from '../state/reducers/employeesReducer';
import { userLoading, userReceived } from '../state/reducers/userReducers';
import { workOrdersLoading, workOrdersReceived } from '../state/reducers/workOrdersReducer';

export const CURRENT_USER_SETTER = {
    path: paths().checkLoginPath, 
    loading: userLoading,
    reducer: userReceived
}

export const BUILDINGS_SETTER = {
    path: paths().buildingsPath, 
    loading: buildingsLoading,
    reducer: buildingsReceived
}

export const WORKORDERS_SETTER = {
    path: paths().workOrdersPath, 
    reducer: workOrdersReceived,
    loading: workOrdersLoading
}

export const EMPLOYEES_SETTER = {
    path: paths().employeesPath, 
    loading: employeesLoading,
    reducer: employeesReceived
}