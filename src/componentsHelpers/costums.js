import { useEffect, useState } from "react"
import { isLoginToken } from "./token"
import { useDispatch } from "react-redux"
import { getFetchAction } from "../actions/fetchActions"

export const useStateUpdated = (objArray) => {
    const [value, setValue] = useState([])
    useEffect(() => {
        objArray?.length > 0 && setValue(objArray)
    },[objArray])
    
    return value
}


export const useFetching = ( setter, dependency1 = false) => {
    const dispatch = useDispatch()
    useEffect(() => {
        console.log("Testing")
       isLoginToken() && dispatch(getFetchAction(setter))
    },[dependency1,  dispatch, setter]); 
}
