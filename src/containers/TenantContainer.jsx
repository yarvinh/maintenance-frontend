
import Tenant from "../components/tenants/Tenant"

const TenantContainer = (props) => {
    const {unit}  = props

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