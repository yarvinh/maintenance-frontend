
const Sanitation = ({violation})=>{

    const date = (date) => {

        if (date){
            date = new Date(date.split('-').join("-").split("T")[0].replace(/-/g, '\/'))
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
                                    <p>Name: {violation.respondent_last_name }</p>
                                    <p>Violation date: {date(violation.violation_date) + " " + violation.violation_time}</p>
                                    <p>Valance due: ${violation.balance_due}</p>
                                    <p>Compliance status: {violation.compliance_status}</p>
                                    <p>hearing date: {date(violation.hearing_date) +" " + violation.hearing_time}</p>
                                    <p>Address: {violation.respondent_address_house + " " + violation.violation_location_street_name}</p>
                                    <p>Ticket number: {violation.ticket_number}</p>
                                    <p>Violation Description: {violation.charge_1_code_description}</p>
                                </div>   
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
    )
};




export default Sanitation