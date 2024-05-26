
import '../../styles/styles.css'
import { connect } from 'react-redux';
import EditReceipt from './EditReceipt';
import {removeReceipt} from '../../actions/receiptsActions'

const Receipt = (props)=>{
  const {image_url,receipt,user} = props


    const receiptUserProfileImage = ()=>{
      if (receipt.user && user.profile_image)
        return(
          <>     
            <img src={ user.profile_image} className="bg-info rounded-circle receipt_user_image" ></img> <br/>
          </>
        )
      else if (receipt.employee?.image)
        return(
            <>     
              <img src={ receipt.employee.image } className="bg-info rounded-circle receipt_user_image" ></img> <br/>
            </>
        )
    }

    const handleOnClickImage = (e)=>{
      if (e.target.className === "picc")
        e.target.className = "picc-enlarger"
      else
        e.target.className = "picc"
    }

    return (
        <div className='receipt'> 
          <div>
            {receiptUserProfileImage()}
            {receipt.employee ? <strong className="profile-name">{receipt.employee?.name}</strong>: <strong className="profile-name">{receipt.user?.name}</strong>}
          </div>
          <img src={image_url} onClick={handleOnClickImage} className="picc"></img>
          <div  className='center'> 
              <EditReceipt receipt={receipt}/>
          </div>
          <strong color="black" className="font-size"> | title: {receipt.title} | Amount: ${receipt.amount} |</strong><br/>   
        </div>
    )
  };



 
  const mapDispatchToProps = dispatch => {
    return {
      removeReceipt: (action) => dispatch(removeReceipt(action))
    }
  }

  export default connect(null, mapDispatchToProps)(Receipt)