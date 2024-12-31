import {useState } from 'react';

const DOBviolation = (props)=>{

    const {violation} = props
    
    // const [acordion,setAcordion] = useState({
    //     acordion: 'display_accordion', 
    //     display: 'hide_elements',
    // })

    // const handleOnclick = (e)=>{
    //     if(acordion.acordion !== 'display_accordion active'){
    //     setAcordion({
    //       acordion: 'display_accordion active',
    //       display: 'display_elements',
    //     })
    //   }else{
    //     setAcordion({
    //       acordion: 'display_accordion',
    //       display: 'hide_elements', 
    //     })
    //   }
    // }
    
    const date = (date) => {
        if (date){
            let year = date.slice(0,4)
            let month = date.slice(4,6)
            let day = date.slice(6,8)
            date = new Date(`${month}-${day}-${year}`)
            return date.toDateString()
        }else{
            return "Something went wrong"
        }
    }
    

    return (
        <div >
                <div className="container d-flex justify-content-center align-items-center">
                    <div >
                        <br/>
                        <br/>
                        <div className="justify-content-center">
                            <div className="mb-3">
                                <div >
                                    <h3 className="card-header">{violation.house_number} {violation.street}</h3>
                                </div>
                                <div className="card-body">
                                    <p>Issue date: {date(violation.issue_date)}</p>
                                    <p>Bin: {violation.bin}</p>
                                    <p>Block: {violation.block}</p>
                                    <p>Number: {violation.number}</p>
                                    <p>Diposition comment: {violation.disposition_comments}</p>
                                    <p>Description: {violation.description}</p>
                                    <p>Violation category: {violation.violation_category}</p>
                                    <p>Violation number: {violation.violation_number}</p>
                                    <p>Violation type: {violation.violation_type}</p>
                                    <p>Violation type code: {violation.violation_type_code}</p>
                                    {/* <a href={`tel:${building.phone_number}`}><span className="bottom">{building.phone_number}</span></a>  */}
                                </div>   
                                {/* <Link to={`/buildings/${building.id}/violations`} >See Violations</Link> */}
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
    )
};




export default DOBviolation