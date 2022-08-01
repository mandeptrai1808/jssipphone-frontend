import { UpdateHistories, UpdateUserLogs } from "../../Components/SocketIO";
import { AppService } from "../../Services/AppService";

export const LoginUser = (_data) => {
  return async (dispatch) => {
    try {
      let { data } = await AppService.loginUser(_data);
      localStorage.setItem("login_user", JSON.stringify(data));
      dispatch({
        type: "IS_LOGIN",
      });
      dispatch(AddUserLog({content:  `${_data.username} has login to app`}));
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
      dispatch({type: "IS_LOADED_PAGE"})
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
      dispatch({type: "IS_LOADED_PAGE"})
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
      dispatch({type: "IS_LOADED_BUTTON"})
    } catch (error) {
      console.log(error)
    }
  }
}

export const CreateNewHistory = (_data) => {
  return async (dispatch) => {
    try {
    const {data} = await AppService.createNewHistory(_data);
    UpdateHistories();
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
    await dispatch(GetAddressByUserId(_data.userId))
    dispatch({type: "CLOSE_SAVE_ADDRESS"})
    dispatch({type: "IS_LOADED_BUTTON"})

   } catch (error) {
    console.log(error)
   }
  }
}

export const GetAllHistories = () => {
  return async (dispatch) => {
    try {
      const {data} = await AppService.getAllCallHistories();
      dispatch({type:"GET_ALL_HISTORIES", content:data})
      dispatch({type: "IS_LOADED_PAGE"})
    } catch (error) {
      console.log(error)
    }
  }
}

export const GetUserLogs = () => {
  return async (dispatch) => {
    try {
      const {data} = await AppService.getUserLogs();
      dispatch({type:"GET_USER_LOGS", content:data})
    } catch (error) {
      console.log(error)
    }
  }
}

export const AddUserLog = (_data) => {
  return async (dispatch) => {
    try {
      const {data} = await AppService.addUserLog(_data);
      UpdateUserLogs();
    } catch (error) {
      console.log(error)
    }
  }
}