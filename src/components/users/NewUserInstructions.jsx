import { connect, useSelector } from 'react-redux';
import CreateBuilding from '../buildings/CreateBuilding';
import { Link } from 'react-router-dom';
import CreateEmployees from '../employees/CreateEmployees';

const NewUserInstructions = ()=>{
    const user = useSelector(state => state.user.user)
    return (
        <article className='center'>
            <header> 
                <strong>Welcome {user.user?.name}</strong>
            </header>
            <p>
                <strong>
                    In order to create your first work order you have to create an employee and a building.
                </strong>    
            </p>
            <div className='personal-account-form'>
                <CreateBuilding/>
                <CreateEmployees/>
            </div>
            <br/>
                <br/>
                <br/>

            <div>
                <Link to="/"  className="home-links">Skip </Link>
            </div>
            <div className='empty-space'></div>
        </article>
    )
}



export default NewUserInstructions

