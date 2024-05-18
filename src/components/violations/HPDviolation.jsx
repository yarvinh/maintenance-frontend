import React, {useState } from 'react';

const HPDviolation = (props)=>{
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
                                    <p>Issue date: {date(violation.novissueddate)}</p>
                                    <p>aparment: {violation.apartment}</p>
                                    <p>Inspection date: {violation.inspectiondate}</p>
                                    <p>Description: {violation.novdescription}</p>
                                    <p>Current status: {violation.currentstatus}</p>
                                    <p>Class: {violation.class}</p>
                                    <p>Violation id: {violation.violationid}</p>
                                    <p>Original certify by date: {violation.originalcertifybydate}</p>
                                    <p>Original correct by date: {violation.originalcorrectbydate}</p>
                                </div>   
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
    )
};




export default HPDviolation