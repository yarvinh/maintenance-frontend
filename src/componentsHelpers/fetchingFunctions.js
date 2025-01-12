import { buildingLoading, buildingReceived } from "../state/reducers/buildingReducer"
import { buildingsLoading, createdOrDeleteBuilding, editBuildingReceived} from "../state/reducers/buildingsReducer"
import {  commentReceived, commentsLoading, commentsReceived, moreCommentsReceived, moreRepliesReceived, repliesLoading, repliesRecieved, replyReceived } from "../state/reducers/commentsReducers"
import { employeeLoading, employeeReceived } from "../state/reducers/employeeReducer"
import { createdOrDeleteEmployee, employeesLoading} from "../state/reducers/employeesReducer"
import { deleteImageFromGallery, galleryLoading, galleryReceived } from "../state/reducers/galleryReducer"
import { createdOrDeleteReceipt, editReceiptsReceived, receiptsLoading, receiptsReceived } from "../state/reducers/receiptsReducers"
import { createdOrDeleteTasks, editTaskReceived, tasksLoading, tasksReceived } from "../state/reducers/tasksReducer"
import { unitLoading, unitReceived } from "../state/reducers/unitReducer"
import { createdOrDeleteUnit, unitsLoading, unitsReceived } from "../state/reducers/unitsReducer"
import { userLoading, userReceived } from "../state/reducers/userReducers"
import { workOrderLoading, workOrderReceived } from "../state/reducers/workOrderReducer"
import { workOrdersLoading,createdOrDeleteWorkOrders, editWorkOrderReceived, workOrdersReceived } from "../state/reducers/workOrdersReducer"
import { paths } from "./paths"


const {usersPath} = paths()
export const buildingSetter=(id)=>{
  return {
    loading: "LOADING_BUILDING", 
    type: 'ADD_BUILDING',
    path: `/buildings/${id}`, 
    stateName: 'building'
  }
}

export const employeePostSetter = ({payload}) =>{
  return {
    payload,
    path: `/employees`,
    loading: employeesLoading,
    reducer: createdOrDeleteEmployee
  }
}

export const employeeDeleteSetter = ({id})=>{
    return {
      path: `/employees/${id}`,
      reducer: createdOrDeleteEmployee
    }
}

export const employeeGetSetter = ({id}) => {
    return {
      path: `/employees/${id}`,
      loading: employeeLoading,
      reducer: employeeReceived,
    }
}

export const buildingPostSetter = ({payload}) => {
  return {
    payload,
    path: paths().buildingsPath,
    loading: buildingsLoading,
    reducer:  createdOrDeleteBuilding,
  }
}

export const buildingDeleteSetter = ({id})=>{
  return {
    path: `${paths().buildingsPath}/${id}`,
    reducer: createdOrDeleteBuilding
  }
}


export const buildingGetSetter = ({id}) => {
  return {
    path: `${paths().buildingsPath}/${id}`,
    loading: buildingLoading,
    reducer: buildingReceived,
  }
}

export const buildingPatchSetter = ({id,payload}) => {
  return {
    payload,
    path: `/buildings/${id}`,
    loading: buildingLoading,
    itemsReducer: editBuildingReceived,
    itemReducer: buildingReceived
  }
}

export const workOrdersGetSetter = ({id}) => {
  return {
    path: `/work_orders/${id}`,
    loading: workOrderLoading,
    reducer: workOrdersReceived,
  }
}

export const workOrderPostSetter = ({admin, payload}) =>{
  return {
    payload,
    path: admin ? `/work_orders` : "/work_order_by_employee",
    loading: workOrdersLoading,
    reducer: createdOrDeleteWorkOrders
  }
}

export const filterWorkOrderSetter = ({query_string}) => {
  return {
    query_string,
    path: paths().workOrdersPath, 
    reducer: workOrdersReceived,
    loading: workOrdersLoading
  }
}

export const workOrderGetSetter = ({id}) => {
  return {
    path: `/work_orders/${id}`,
    loading: workOrderLoading,
    reducer: workOrderReceived,
  }
}



export const workOrderPatchSetter = ({id,payload}) => {
  return {
    payload,
    path: `/work_orders/${id}`,
    loading: workOrderLoading,
    itemsReducer: editWorkOrderReceived,
    itemReducer: workOrderReceived
  }
}

export const workOrderDeleteSetter = ({id})=>{
  return {
    path: `/work_orders/${id}`,
    reducer: createdOrDeleteWorkOrders
  }
}

export const deleteEmployeeFromWorkOrder = ({id,workOrderId}) => {
  return {
    path: `/work_orders/${workOrderId}/remove_employee/${id}`,
    loading: workOrderLoading,
    reducer: editWorkOrderReceived,
    optionalReducer: workOrderReceived
  }
}

 export const tasksGetSetter = ({id}) => {
  return {
    path: `/work_orders/${id}/tasks`,
    reducer: tasksReceived,
    loading: tasksLoading
  }
}

export const taskPostSetter = ({id,payload}) => {
  return {
    payload,
    path: `/work_orders/${id}/tasks`,
    loading: tasksLoading,
    reducer:  createdOrDeleteTasks,
  }
}

export const taskPatchSetter = ({workOrderId, id, payload}) => {
  return {
    // payload,
    // path: `/work_orders/${workOrderId}/tasks/${id}`,
    // loading: tasksLoading,
    // itemReducer: editTaskReceived,
    // itemsReducer: editWorkOrderReceived,
    payload,
    path: `/work_orders/${workOrderId}/tasks/${id}`,
    loading: workOrderLoading,
    itemReducer: editTaskReceived,
    optionalReducer: editWorkOrderReceived,
    optionalReducer2: workOrderReceived,
    propertyName: "work_order",
  }
}

export const taskDeleteSetter = ({workOrderId, id})=>{
  return {
    path: `/work_orders/${workOrderId}/tasks/${id}`,
    reducer: createdOrDeleteTasks,
    optionalReducer2: editWorkOrderReceived,
    optionalReducer3: workOrderReceived,
    propertyName: "work_order"

  }
}
export const commentGetSetter = ({id,workOrderId}) => {
  return {
    path: `/work_orders/${workOrderId}/comments/${id}`,
    reducer: commentReceived
  }
}
export const commentsGetSetter = ({id,comments_length}) => {
  return {
    query_string: comments_length,
    path: `/work_orders/${id}/comments`,
    reducer: commentsReceived,
    loading: commentsLoading
  }
}

export const moreCommentsGetSetter = ({id,comments_length}) => {
  return {
    query_string: comments_length,
    path: `/work_orders/${id}/comments`,
    reducer: moreCommentsReceived,
    loading: commentsLoading
  }
}

export const commentDeleteSetter = ({workOrderId, id})=>{
  return {
    path: `/work_orders/${workOrderId}/comments/${id}`,
  }
}

export const likePostSetter = ({payload}) => {
  return {
    payload,
    path: `/likes`,
  }
}

export const likeDeleteSetter = ({id})=>{
  return {
    path: `/likes/${id}`,
  }
}

export const replyPostSetter = ({payload}) => {
  return {
    payload,
    path: `/replies`,
    reducer:  replyReceived,
  }
}

export const repliesGetSetter= (payload) => {
  return {
    query_string: payload,
    path: "/replies",
    reducer: repliesRecieved,
    loading: repliesLoading
  }
}

export const getMoreRepliesGetSetter= (payload) => {
  return { 
    query_string: payload,
    path: "/replies",
    reducer: moreRepliesReceived,
    loading: repliesLoading
  }
}

export const replyDeleteSetter = ({id})=>{
  return {
    path: `/replies/${id}`,
  }
}


export const createUserSetter = (payload)=>{
  return {
    payload,
    path: usersPath,
    reducer: userReceived
  }
}


export const editUserSetter = ({payload, id, userType})=>{
  return {
    payload,
    path: `/${userType}/${id}`,
    itemReducer: userReceived,
    loading: userLoading
  }
}


export const getReceiptsSetter= ({id}) => {
 return {
    path: `/work_orders/${id}/receipts`,
    reducer: receiptsReceived,
    loading: receiptsLoading
 }
}


export const editReceiptSetter = ({payload, workOrderId, id})=>{
  return {
    payload,
    path: `/work_orders/${workOrderId}/receipts/${id}`,
    itemReducer: editReceiptsReceived,
    optionalReducer: editWorkOrderReceived,
    propertyName: "work_order"
  }
}

export const receiptDeleteSetter = ({workOrderId,id})=>{
  return {
    path: `/work_orders/${workOrderId}/receipts/${id}`,
    reducer: createdOrDeleteReceipt,
    optionalReducer2: editWorkOrderReceived,
    optionalReducer3: workOrderReceived,
    propertyName: "work_order"
  }
}

export const getGallerySetter= ({workOrderId}) => {
  return {
     path: `/work_orders/${workOrderId}/gallery_images`,
     reducer: galleryReceived,
     loading: galleryLoading
  }
}

export const galleryImageDeleteSetter = ({workOrderId, id}) => {
   return {
    path: `/work_orders/${workOrderId}/gallery_images/${id}`,
    reducer: deleteImageFromGallery
   }
}

export const getUnitsSetter = ({buildingId}) => {
   return {
    path: `/buildings/${buildingId}/units`,
    reducer: unitsReceived,
    loading: unitsLoading
   }
}

export const getUnitSetter = ({buildingId, id}) => {
  return {
   path: `/buildings/${buildingId}/units/${id}`,
   reducer: unitReceived,
   loading: unitLoading
  }
}

export const createUnitSetter = ({payload, buildingId})=>{
  return {
    payload,
    path: `/buildings/${buildingId}/units`,
    reducer: createdOrDeleteUnit
  }
}

export const deleteUnitSetter = ({id, buildingId}) => {
   return {
    path: `/buildings/${buildingId}/units/${id}`,
    reducer: createdOrDeleteUnit
   }
}

export const searchSetter = ({path,payload}) => {
  return {
    query_string: payload,
    path: path,
    reducer: buildingGetSetter
  }
}


