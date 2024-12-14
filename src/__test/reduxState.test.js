import store from "../state/store"

describe('Redux state tests', () => {
  
    it('Should initially set user to an default object', () => {
      const state = store.getState().user
      expect(state.user).toEqual({
        "admin": false,
        "is_login": false,
        "user": {
          "id": 0
        }   
      })
    })

    it('Should exist initially set workOrders to an empty array', () => {
      const state = store.getState().workOrders
      expect(state.workOrders).toEqual([])
    })

    it('Should exist initially set workOrder to an empty object', () => {
      const state = store.getState().workOrder
      expect(state.workOrder).toEqual({})
    })
     
    it('Should exist initially set workOrders to an empty array', () => {
      const state = store.getState().employees
      expect(state.employees).toEqual([])
    })

    it('Should exist initially set workOrder to an empty object', () => {
      const state = store.getState().employee
      expect(state.employee).toEqual({})
    })

    it('Should exist initially set buildings to an empty array', () => {
      const state = store.getState().buildings
      expect(state.buildings).toEqual([])
    })

    it('Should exist initially set units to an empty array', () => {
      const state = store.getState().units
      expect(state.units).toEqual([])
    })

    it('Should exist initially set unit to an empty onject', () => {
      const state = store.getState().unit
      expect(state.unit).toEqual({})
    })

    // it('Should exist initially set unit to an comments object', () => {
    //   const state = store.getState().comments
    //   expect(state.comments).toEqual([])
    // })

})