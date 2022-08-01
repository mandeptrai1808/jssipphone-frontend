const stateDefault = {
    userData: {},
    historiesCall: [],
    isLogin: false,
    bookAddress: [],
    searchData: '',
    allHistories: [],
    userLogs: [],
    loadingPage: false,
    loadingButton: false
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

    case "GET_ALL_HISTORIES":{
        state.allHistories = action.content.sort((a,b) => {
            return b.infoCall?.id - a.infoCall?.id
          });
        return {...state}
    }

    case "GET_USER_LOGS":{
        state.userLogs = action.content.sort((a,b) => {
            return b.id - a.id
          });
        return {...state}
    }

    case "IS_LOADING_PAGE":{
        state.loadingPage = true;
        return {...state}
    }

    case "IS_LOADED_PAGE":{
        state.loadingPage = false;
        return {...state}
    }

    case "IS_LOADING_BUTTON":{
        state.loadingButton = true;
        return {...state}
    }

    case "IS_LOADED_BUTTON":{
        state.loadingButton = false;
        return {...state}
    }

    default:
        return {...state}
  }
}