
import {Link} from 'react-router-dom'
import '../../styles/styles.css'
import { useDispatch } from 'react-redux';
import { buildingDeleteSetter } from '../../componentsHelpers/fetchingFunctions';
import { deleteFetchAction } from '../../actions/fetchActions';

const Building = ({building,admin,index})=>{
    const dispatch = useDispatch()
    const handleOnClick = (e)=> {
      const payload = buildingDeleteSetter({id: building.id})
      const confirmBox = window.confirm(
          "Are you sure you want to delete this building?"     
      )
      if(confirmBox === true) dispatch(deleteFetchAction(payload))          
    }

    return (
        <>
          <tr>
              <td>{index}</td>
              <td>
                  <Link to={`/buildings/${building.id}`}><p >{building.address}</p>  </Link>
              </td>
              <td><p>{building.super_name}</p></td>
              <td> <a href={`tel:${building.phone_number}`}><span className="bottom">{building.phone_number}</span></a> </td>
              <td>{admin &&  <i onClick={handleOnClick}  className="fa-solid fa-trash-can delete-task " role="button"></i>} </td>
          </tr>
        </>
    )  
};

export default Building