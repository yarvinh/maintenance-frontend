
import Tenant from "../components/tenants/Tenant"

const TenantContainer = ({unit}) => {

    const displayTenants=()=>{
        return unit.tenants?.map((tenant)=>{
          return (
            <div key={tenant.id} className='tenant'>
                {<Tenant tenant={tenant}/>}
            </div>
          )
        })
    }

    return (
        <div className={'tenant-container'}>
            {displayTenants()}
        </div>
    )    
}

export default TenantContainer