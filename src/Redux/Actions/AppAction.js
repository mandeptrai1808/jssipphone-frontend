import { AppService } from "../../Services/AppService";

export const LoginUser = (_data) => {
  return async (dispatch) => {
    try {
      let { data } = await AppService.loginUser(_data);
      localStorage.setItem("login_user", JSON.stringify(data));
      dispatch({
        type: "IS_LOGIN",
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const GetHistoriesByUserId = (_userId) => {
  return async (dispatch) => {
    try {
      let { data } = await AppService.getHistoriesByUserId(_userId);
      dispatch({
        type: "GET_HISTORIES_CALL",
        content: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const GetAddressByUserId = (_userId) => {
  return async (dispatch) => {
    try {
        let {data} = await AppService.getAddressByUserId(_userId);
        dispatch({
            type: "GET_BOOKS_ADDRESS",
            content: data
        })
    } catch (error) {
        console.log(error)
    }
  }
}

export const CreateNewAddress = (_data) => {
  return async (dispatch) => {
    try {
      const {data} = await AppService.createNewAddress(_data);
      dispatch(GetAddressByUserId(_data.userId));
      dispatch({type: "CLOSE_SAVE_ADDRESS"})
    } catch (error) {
      console.log(error)
    }
  }
}

export const CreateNewHistory = (_data) => {
  return async (dispatch) => {
    try {
    const {data} = await AppService.createNewHistory(_data);
      console.log(data)
    } catch (error) {
      console.log(error)
    }    
  }
}

export const UpateAddress = (_data, _id) => {
  return async (dispatch) => {
   try {
    const {data} = await AppService.updateAddress(_data, _id);
    dispatch(GetAddressByUserId(_data.userId))
    dispatch({type: "CLOSE_SAVE_ADDRESS"})
   } catch (error) {
    console.log(error)
   }
  }
}