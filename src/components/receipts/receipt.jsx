
import '../../styles/styles.css'
import { useDispatch, useSelector } from 'react-redux';
import EditReceipt from './EditReceipt';
import { deleteFetchAction } from '../../actions/fetchActions';
import { receiptDeleteSetter } from '../../componentsHelpers/fetchingFunctions';
import { useParams } from 'react-router';

const Receipt = ({receipt})=>{
  const dispatch = useDispatch()
  const {workOrderId} = useParams()
    const user = useSelector(state => state.user.user)
    
    const handleOnClickImage = (e)=>{
      if (e.target.className === "picc")
        e.target.className = "picc-enlarger"
      else
        e.target.className = "picc"
    }

    const handleDeleteOnClick = (e) => {
      const payload = receiptDeleteSetter({workOrderId: workOrderId, id: receipt.id})
      const message = "Are you sure you want to delete this receipt."
      const confirmBox = window.confirm(message)
      if (confirmBox === true ) 
        dispatch(deleteFetchAction(payload))    
    
         
    }
    

    return (
        <div className='receipt'> 
        {receipt.user?.id === user.user?.id || receipt.employee?.id === user.user?.id ? <img src="/close.svg" onClick={handleDeleteOnClick} className='x-delete' alt="X delete reply"/> : null}
          <div>
          {receipt.user && user.profile_image &&  <img src={ user.profile_image} className="bg-info rounded-circle receipt_user_image" ></img>}
          {receipt.employee?.image && <img src={ receipt.employee.image } className="bg-info rounded-circle receipt_user_image" ></img>}
            {receipt.employee ? <strong className="profile-name">{receipt.employee?.name}</strong>: <strong className="profile-name">{receipt.user?.name}</strong>}
          </div>
          <img src={receipt.image_url} onClick={handleOnClickImage} className="picc"></img>
          <div  className='center'> 
              <EditReceipt receipt={receipt}/>
          </div>
          <strong color="black" className="font-size"> | title: {receipt.title} | Amount: ${receipt.amount?.toFixed(2)?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} |</strong><br/>   
        </div>
    )
  };

  export default Receipt