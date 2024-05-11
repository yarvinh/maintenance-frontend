import {useState,useEffect} from 'react';
import { connect } from 'react-redux';
import CreateBuilding from '../components/buildings/CreateBuilding'
import Building from "../components/buildings/Building"
import {useParams,useNavigate} from 'react-router-dom';
import {searchBuilding} from "../actions/buildingsActions"
import {buildingsFilter} from '../componentsHelpers/buildings'
import { getFetchAction } from '../actions/fetchActions';
import {BUILDINGS_SETTER} from '../componentsHelpers/fetchingConstants';

const BuildingsContainer = (props) => {
    let navigate = useNavigate()
    let {admin,user} = props.user
    const {id} = useParams()
    const [buildings, setBuildings] = useState([])
    const [searchBoxValue, setSearchBoxValue] = useState("")
    useEffect(()=>{
      props.getFetchAction( BUILDINGS_SETTER) 
    },[])

    useEffect(()=>{
        setBuildings(props.buildings)
    },[props.buildings])

    const goBack = (e) => {
        return navigate(-1)
    }

    const handleOnChangeSearch = (e) => {
      setSearchBoxValue(e.target.value)
    }
    
    let handleOnChange = (e)=>{
        setBuildings(buildingsFilter({buildings: props.buildings, value: e.target.value}))
        setSearchBoxValue(e.target.value)
    }

    const handleOnSubmit = (e)=>{
      e.preventDefault()
      if (searchBoxValue.trim() !== '')
        props.searchBuilding(searchBoxValue)
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
        <div >
            {!id ? <CreateBuilding />: null }
            <br/>
            <div className="center">
                {props.buildings?.length > 15 && admin || buildings.length > 15 && user.user_id?<input onChange={handleOnChange} className='search_box' placeholder='Search Buildings ' type='search' value={searchBoxValue}/>:null}
            </div>
            <div >
                <form onSubmit={handleOnSubmit} className="center">
                  {!user?.user_id && !user?.admin ? <input onChange={handleOnChangeSearch} className='search_box' placeholder='Search buildings ' type='search' value={searchBoxValue}/>:null}
                </form>
            </div>
            <br/>
            <div>
              {!id && buildings !== 0? renderBuildings(): <h3 className='text'>You have no buildings to display at this moment</h3> }
            </div>
            <br></br>
            <button  className="back-button" onClick={goBack}> {"<< Back"} </button>
            <div className='empty-space'></div>
        </div>
    )   
}

const mapStateToProps = state => { 
    return {
      user: state.user.user,
      buildings: state.buildings.buildings,
      loading: state.loading
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      getFetchAction: (action) => dispatch(getFetchAction(action)),
      searchBuilding: (action) => dispatch(searchBuilding(action)),
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(BuildingsContainer)
  