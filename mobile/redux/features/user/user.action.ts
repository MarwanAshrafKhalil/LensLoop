import { userSlice } from "./user.slice";
import * as requestFromServer from "./user.crud";
import { Dispatch } from "redux";

const { actions: userActions } = userSlice;

export const signinUser =
  (data: { username: string; password: string }) =>
  async (dispatch: Dispatch) => {
    dispatch(userActions.openLoader());
    try {
      const response = await requestFromServer.getUser(data);
      const responseData = await response?.json();
      if (responseData.success === false) {
        dispatch(userActions.catchError(responseData));
      } else dispatch(userActions.fetchUser(responseData));

      console.log("Done");
    } catch (error) {
      dispatch(userActions.catchError(error));
    } finally {
      dispatch(userActions.closeLoader());
    }
  };
