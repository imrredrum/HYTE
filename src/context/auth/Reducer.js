const Reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return {
        ...state,
        ...action.value,
      }

    case 'CLEAR':
      return {
        isAuthed: false,
        user: {},
      }

    default:
      return state
  }
}

export default Reducer
