import { axiosHelper } from "../helpers/axiosHelper";

export const useBackend = () => {
  const getUsers = async () => {
    let resp = await axiosHelper({
      url: "users",
      method: "get",
    });
    return resp;
  };
  const getUser = async (userId) => {
    let resp = await axiosHelper({
      url: "users/" + userId,
      method: "get",
    });
    return resp;
  };
  const postUser = async (user) => {
    let resp = await axiosHelper({ url: "users", method: "post", data: user });
    return resp;
  };
  const putUser = async (user) => {
    let resp = await axiosHelper({
      url: "users/" + user.id,
      method: "put",
      data: user,
    });
    return resp;
  };
  const resetPassword = async () => {
    let resp = await axiosHelper({
      url: "users/reset-password",
      method: "put",
    });
    return resp;
  };
  return {
    getUsers,
    getUser,
    postUser,
    putUser,
    resetPassword,
  };
};
