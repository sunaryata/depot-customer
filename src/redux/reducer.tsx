const initialState = {
  authToken: null,
  transactionData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state, //copy all previous states
        authToken: action.payload,
      };
    case 'TRANSACTION':
      return {
        ...state, //copy all previous states
        transactionData: action.payload,
      };
    case 'LOGOUT':
      return {
        authToken: null,
      };
    default:
      return state;
  }
};
