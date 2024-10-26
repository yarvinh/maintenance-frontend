import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import CreateUnit from "../components/units/CreateUnit"
import Unit from "../components/units/Unit"
import { getFetchAction } from '../actions/fetchActions';
import { getUnitsSetter } from '../componentsHelpers/fetchingFunctions';
import LoadingItems from '../components/LoadingItems';

const UnitsContainer = ({building}) => {
  const dispatch = useDispatch()
  const units = useSelector(state => state.units.units)
  const loading = useSelector(state => state.units.loadingUnits)
    const {buildingId} = useParams()
    useEffect(() => {
        const payload = getUnitsSetter({buildingId})
        building.id && dispatch(getFetchAction(payload))
    },[]);

    const displayUnits = ()=>{
      return units?.map((unit)=>{
        return (
            <div  key={unit.id}>
                <Unit unit={unit}/>
            </div>
        )     
      })
    }

    return (
        <div>
          {loading && <LoadingItems/>}
            <div className='unit-creater'>
              <CreateUnit building={building}/> 
            </div>
            <div className='units-container'>
              {displayUnits()} 
            </div>  
        </div>
    )   
}

export default UnitsContainer