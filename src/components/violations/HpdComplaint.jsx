import  {useState } from 'react';

const HpdComplaint = (props)=>{
    const {violation} = props 

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
                                    <p>Location: {violation.street_name}</p>
                                    <p>Issue date: {date(violation.received_date)}</p>
                                    <p>aparment: {violation.apartment}</p>
                                    <p>Problem status date: {violation.received_date}</p>
                                    <p>Problem code: {violation.problem_code}</p>
                                    <p>Minor category: {violation.minor_category}</p>
                                    <p>Description: {violation.novdescription}</p>
                                    <p>Complait status: {violation.complaint_status}</p>
                                    <p>Status description: {violation.status_description}</p>
                                    <p>Class: {violation.class}</p>
                                    <p>Type: {violation.type}</p>
                                    <p>Violation id: {violation.complaint_id}</p>
                                    <p>Unit type: {violation.unit_type}</p>
                                    <p>Space type: {violation.space_type}</p>
                                </div>   
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
    )
};




export default HpdComplaint