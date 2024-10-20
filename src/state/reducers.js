import { combineReducers } from "redux";
import userReducer from "./reducers/userReducers"
import AccordionReducer from "./reducers/accordionReducer"
import WorkOrdersReducer from "./reducers/workOrdersReducer"
import errorsOrMessagesReducer from "./reducers/errorsOrMessagesReducer"
import EmployeesReducer from "./reducers/employeesReducer"
import accountReducer from "./reducers/accountReducer"
import buildingsReducer from "./reducers/buildingsReducer"
import employeeReducer from "./reducers/employeeReducer"
import displayElementReducer from "./reducers/displayElementReducer"
import BuildingReducer from "./reducers/buildingReducer"
import workOrderReducer from "./reducers/workOrderReducer"
import tasksReducer from "./reducers/tasksReducer"
import commentsReducer from "./reducers/commentsReducers"
import receiptsReducer from "./reducers/receiptsReducers";
import galleryReducer  from "./reducers/galleryReducer";
import violationsReducer  from "./reducers/violationsReducer";
import unitsReducer from "./reducers/unitsReducer";
import unitReducer from "./reducers/unitReducer";

// import {WorkOrdersReducer,WorkOrdersToFilterReducer,WorkOrderReducer,EmployeeWorkOrdersReducer,WorkOrderIndex} from "../actions/workOrdersReducers"
// import {EmployeeReducer,EmployeesReducer} from "./employeesReducers"
// import {BuildingsReducer,BuildingReducer } from "./buildingsReducers"
// import {CommentsReducer,commentReducer} from "./commentsReducers"
// import {ReplyReducer,RepliesReducer} from "./repliesReducers"
// import {TasksReducer,taskReducer} from "./tasksReducers"
// import {messageReducer,messagesEndErrors} from "./errorsOrMessagesReducers"
// import {violationsReducer} from "./violationsReducers"
// import { UnitReducer,UnitsReducer } from "./unitsReducers";
// import {receiptsReducer} from "./receiptsReducer"
// import {galleryReducer} from "./galleryReducer"

const Loading = (state = {loading: false}, action) => {
   switch(action.type) {
         case 'LOADING':
           return state = {
             loading: true    
         }
         default:
            return state;
         
   }
}




const rootReducer = combineReducers({
   loading: Loading,
   user: userReducer,  
   accordion: AccordionReducer,
   workOrders: WorkOrdersReducer,
   errorsOrMessages: errorsOrMessagesReducer,
   employees: EmployeesReducer,
   account:  accountReducer,
   buildings: buildingsReducer,
   employee: employeeReducer,
   isDisplay: displayElementReducer,
   building: BuildingReducer,
   workOrder: workOrderReducer,
   tasks: tasksReducer,
   comments: commentsReducer,
   receipts: receiptsReducer,
   gallery: galleryReducer,
   violations: violationsReducer,
   units: unitsReducer,
   unit: unitReducer
   // isDisplay: displayElementReducer,
   // workOrders: WorkOrdersReducer,
   // employeeWorkOrders: EmployeeWorkOrdersReducer,
   
   // workOrdersToFilter: WorkOrdersToFilterReducer,
   // comments: CommentsReducer,
   // comment:  commentReducer,
   // replies: RepliesReducer,
   // reply: ReplyReducer ,
   // tasks: TasksReducer,
   // task: taskReducer ,
   // errorsOrMessages: messagesEndErrors,
   // message: messageReducer,
   // violations: violationsReducer,
   // receipts: receiptsReducer,
   // gallery: galleryReducer,
   // units: UnitsReducer,
   // unit: UnitReducer,
  
   // workOrderIndex: WorkOrderIndex,
   // account:  accountType,
   // paths: pathsReducer
});
   
export default rootReducer;