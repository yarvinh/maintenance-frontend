import { combineReducers } from "redux";
import {UserReducer, accountType } from "./userReducers"
import {WorkOrdersReducer,WorkOrdersToFilterReducer,WorkOrderReducer,EmployeeWorkOrdersReducer,WorkOrderIndex} from "./workOrdersReducers"
import {EmployeeReducer,EmployeesReducer} from "./employeesReducers"
import {BuildingsReducer,BuildingReducer } from "./buildingsReducers"
import {CommentsReducer,commentReducer} from "./commentsReducers"
import {ReplyReducer,RepliesReducer} from "./repliesReducers"
import {TasksReducer,taskReducer} from "./tasksReducers"
import {AcordionReducer} from "./acordionReducer"
import {messageReducer,messagesEndErrors} from "./errorsOrMessagesReducers"
import {violationsReducer} from "./violationsReducers"
import { UnitReducer,UnitsReducer } from "./unitsReducers";
import {receiptsReducer} from "./receiptsReducer"
import {galleryReducer} from "./galleryReducer"


const rootReducer = combineReducers({
   user: UserReducer,  
   employees: EmployeesReducer,
   employee: EmployeeReducer,
   buildings: BuildingsReducer,
   building: BuildingReducer,
   workOrders: WorkOrdersReducer,
   employeeWorkOrders: EmployeeWorkOrdersReducer,
   workOrder: WorkOrderReducer,
   workOrdersToFilter: WorkOrdersToFilterReducer,
   comments: CommentsReducer,
   comment:  commentReducer,
   replies: RepliesReducer,
   reply: ReplyReducer ,
   tasks: TasksReducer,
   task: taskReducer ,
   errorsOrMessages: messagesEndErrors,
   message: messageReducer,
   violations: violationsReducer,
   receipts: receiptsReducer,
   gallery: galleryReducer,
   units: UnitsReducer,
   unit: UnitReducer,
   acordion: AcordionReducer,
   workOrderIndex: WorkOrderIndex,
   account:  accountType,
   // paths: pathsReducer
});
   
export default rootReducer;