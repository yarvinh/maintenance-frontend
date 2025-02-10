
const HPDviolation = (props)=>{
    const {violation} = props 

    const date = (date) => {
        if (date){
            date = new Date(date.split('-').join("-").split("T")[0].replace(/-/g, '/'))
          return date.toDateString()
        }else{
            return "Something went wrong"
        }
    }

    return (
        <div >
                <div className="justify-content-center align-items-center">
                    <div >
                        <br/>
                        <br/>
                        <div className="justify-content-center">
                            <div className="mb-3">
                                <div >
                                    <h3 className="card-header">{violation.lowhousenumber} {violation.streetname}</h3>
                                </div>
                                <div className="card-body">
                                    {violation.novissueddate && <p>Issue date: {date(violation.novissueddate)}</p>}
                                    {violation.approveddate && <p>Issue date: {date(violation.approveddate)}</p>}
                                    {violation.apartment && <p>aparment: {violation.apartment}</p>}
                                    {violation.inspectiondate && <p>Inspection date: {violation.inspectiondate}</p>}
                                    {violation.buildingid && <p>Building id: {violation.buildingid}</p>}
                                    <p>Description: {violation.novdescription}</p>
                                    <p>Current status: {violation.currentstatus}</p>
                                    <p>Class: {violation.class}</p>
                                    <p>Violation id: {violation.violationid}</p>
                                    {violation.originalcertifybydate && <p>Original certify by date: {violation.originalcertifybydate}</p>}
                                    {violation.originalcorrectbydate && <p>Original correct by date: {violation.originalcorrectbydate}</p>}
                                </div>   
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
    )
};

export default HPDviolation