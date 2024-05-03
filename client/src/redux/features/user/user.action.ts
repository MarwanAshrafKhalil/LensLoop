import { userSlice } from "./user.slice";
import * as requestFromServer from "./user.crud";
import { Dispatch } from "redux";

const { actions: userActions } = userSlice;

export const signinUser = (data: FormData) => async (dispatch: Dispatch) => {
  dispatch(userActions.openLoader());
  try {
    const response = await requestFromServer.getUser(data);
    const responseData = await response?.json();
    if (responseData.success === false) {
      dispatch(userActions.catchError(responseData));
    } else dispatch(userActions.fetchUser(responseData));
  } catch (error) {
    dispatch(userActions.catchError(error));
  } finally {
    dispatch(userActions.closeLoader());
  }
};

// export const updateUser = (formData) => async (dispatch) => {
//   // console.log("DATA: ", data);
//   console.log("formData-act: ", formData);

//   dispatch(userActions.openLoader());
//   try {
//     const response = await requestFromServer.updatedUser(formData);

//     // console.log("response: ", response);

//     if (!response.ok) {
//       throw new Error(`Failed to update User: ${response.statusText}`);
//     }

//     const responseData = await response.json();

//     if (responseData.success === false) {
//       dispatch(userActions.catchError(responseData));
//       return false;
//     } else {
//       dispatch(userActions.fetchUser(responseData));
//       return true;
//     }
//   } catch (error) {
//     dispatch(userActions.catchError(error));
//   } finally {
//     dispatch(userActions.closeLoader());
//   }
// };

// export const deleteUser = (data) => async (dispatch) => {
//   // console.log("DATA: ", data);
//   dispatch(userActions.openLoader());
//   try {
//     const res = await fetch("/api/user/delete/${}", {
//       method: "DELETE",
//     });
//     const data = await res.json();
//     if (data.success === false) {
//       return;
//     }
//     dispatch(deleteUser());
//   } catch (error) {
//     dispatch(userActions.catchError(error));
//   } finally {
//     dispatch(userActions.closeLoader());
//   }
// };
