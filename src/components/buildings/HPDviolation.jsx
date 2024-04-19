import React, {useState } from 'react';

const HPDviolation = (props)=>{
    const {violation} = props 
    const [acordion,setAcordion] = useState({
        acordion: 'display_accordion', 
        display: 'hide_elements',
    })

    const handleOnclick = (e)=>{
        if(acordion.acordion !== 'display_accordion active'){
        setAcordion({
          acordion: 'display_accordion active',
          display: 'display_elements',
        })
      }else{
        setAcordion({
          acordion: 'display_accordion',
          display: 'hide_elements', 
        })
      }
    }
    
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
            <button onClick={handleOnclick} className={acordion.acordion}>Issue Date: {date(violation.novissueddate)}</button>
            <div className={acordion.display}>
                <div className="container d-flex justify-content-center align-items-center">
                    <div >
                        <br/>
                        <br/>
                        <div className="container d-flex justify-content-center">
                            <div className="card-container mb-3">
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
                                    {/* <p>Violation type code: {violation.violation_type_code}</p> */}
                 
                                </div>   
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
        </div>
    )
};




export default HPDviolation