const stateDefault = {
    phoneNumberRedux: '',
    isCall: false,
    isComfirm: false,
    callTime: 0
}

export const PhoneReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "UPDATE_PHONE_NUMBER":{
        state.phoneNumberRedux = action.content;
        return {...state};
    }

    case "IS_CALLING":
        {
            console.log("hey")
            state.isCall = true;
            return {...state}
        }
    case "NOT_CALLING":{
        state.isCall = false;
        return {...state}
    }
  
    case "IS_COMFIRM_CALL":{
        state.isComfirm = true;
        return {...state}
    }
    case "RESET_COMFIRM_CALL":{
        state.isComfirm = false;
        return {...state}
    }

    case "GET_TIME_CALL":{
        state.callTime = action.content;
        return {...state}
    }
    default:
        return {...state}
  }
}