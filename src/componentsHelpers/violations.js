import { reverseByDate } from "./arrayHelper"

export const fixProperties = ({ lot, block }) => {
  lot = lot.padStart(4, '0');
  block = block.padStart(5, '0');
  
  return {
    fixedBlock: block,
    fixedLot: lot
  };
};

export const violationsFilter = ({allViolations,lot})=>{
    const filterViolations = allViolations.filter(vioArr => {
      return vioArr.violation_location_lot_no === lot
    })
    return reverseByDate(filterViolations, "date")
}