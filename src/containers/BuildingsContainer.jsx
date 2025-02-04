import {useState,useEffect} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import CreateBuilding from '../components/buildings/CreateBuilding'
import Building from "../components/buildings/Building"
import {buildingsFilter} from '../componentsHelpers/buildings'
import { getFetchAction } from '../actions/fetchActions';
import {BUILDINGS_SETTER} from '../componentsHelpers/fetchingConstants';
import LoadingItems from '../components/LoadingItems';
import { buildingsLoading, buildingsReceived } from '../state/reducers/buildingsReducer';
import { isLoginToken } from '../componentsHelpers/token';

const BuildingsContainer = () => {
    const dispatch = useDispatch()
    const {admin,user} = useSelector(state => state.user.user )
    const buildingsData = useSelector(state => state.buildings.buildings)
    const loading = useSelector(state => state.buildings.buildingsLoading)
    const [buildings, setBuildings] = useState([])
    const [searchBoxValue, setSearchBoxValue] = useState("")
   
    useEffect(()=>{
       isLoginToken() && dispatch(getFetchAction( BUILDINGS_SETTER) )
    },[dispatch])
    
    useEffect(()=>{
      buildingsData.length > 0 && setBuildings(buildingsData )
    },[buildingsData])

    const handleOnChangeSearch = (e) => {
      setSearchBoxValue(e.target.value)
    }
    
    let handleOnChange = (e)=>{
        setBuildings(buildingsFilter({buildings: buildingsData , value: e.target.value}))
    }

    const handleOnSubmit = (e)=>{
      e.preventDefault()
      if (searchBoxValue.trim() !== '')
        dispatch(getFetchAction({path: "/search/buildings/", query_string: searchBoxValue, reducer: buildingsReceived, loading: buildingsLoading}))
    }

    const renderBuildings = () => {     
        return (
          <>
            <table className="table table-striped" > 
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Address</th>
                <th scope="col">Superintendent</th>
                <th scope="col">Phone Number</th>
            </tr>
            </thead>
            <tbody>
              {buildings.map((building,index) => {return (<Building key={building.id} admin={admin} building={building} index={index + 1} />)}) }
            </tbody>
            </table>
          </>
        )
    }

    return (
        <section>
            <CreateBuilding/>
            <br/>
            <div className="center">
              {loading && <LoadingItems/>}
              {(buildingsData?.length > 15 && admin) || (buildingsData.length > 15 && user.user_id) ? <input onChange={handleOnChange} className='search_box' placeholder='Search Buildings ' type='search' />:null}
            </div>
            <div>
                <form onSubmit={handleOnSubmit} className="center">
                  {!user?.user_id && !user?.admin && <input onChange={handleOnChangeSearch} className='search_box' placeholder='Search buildings ' type='search' value={searchBoxValue}/>}
                </form>
            </div>
            <br/>
            <div>
              {buildings !== 0? renderBuildings(): <h3 className='text'>You have no buildings to display at this moment</h3> }
            </div> 
        </section>
    )   
}

export default BuildingsContainer
  