const awards = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE_AWARDS':
      return action.arr
    default:
      return state
  }
}

export default awards
