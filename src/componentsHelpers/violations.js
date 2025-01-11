import { reverseByDate } from "./arrayHelper"

export const fixProperties = ({lot, block})=>{
    if(lot.length < 2)
      lot = `000${lot}`
    else if(lot.length < 3)
      lot = `00${lot}`
    else if(lot.length < 4)
      lot = `0${lot}`

    if(block.length < 2)
      block = `0000${block}`
    else if(block.length < 3)
      block = `000${block}`
    else if(block.length < 4)
      block = `00${block}`
    else if (block.length < 5)
      block = `0${block}`

    return {
        fixedBlock: block, 
        fixedLot: lot
    }
}

export const violationsFilter = ({allViolations,lot})=>{
    const filterViolations = allViolations.filter(vioArr => {
      return vioArr.violation_location_lot_no === lot
    })
    return reverseByDate(filterViolations, "date")
}