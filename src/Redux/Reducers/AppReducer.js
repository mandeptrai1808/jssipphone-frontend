const stateDefault = {
    userData: {},
    historiesCall: [],
    isLogin: false,
    bookAddress: [],
    searchData: ''
}

export const AppReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_DATA_USER":{
        state.userData = action.content
        return {...state}
    }
    
    case "GET_HISTORIES_CALL": {
        state.historiesCall = action.content.sort((a,b) => {
          return b.id - a.id
        });
        return {...state}
    }

    case "GET_BOOKS_ADDRESS":{
        state.bookAddress = action.content;
        return {...state}
    }
    
    case "IS_LOGIN": {
        state.isLogin = true;
        return {...state}
    }
    
    case "IS_NOT_LOGIN": {
        state.isLogin = false;
        return {...state}
    }

    case "GET_SEARCH_DATA":{
        state.searchData = action.content;
        return {...state}
    }
    default:
        return {...state}
  }
}