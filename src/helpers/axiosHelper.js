import Swal from "sweetalert2";

var axios = require("axios");
export const axiosHelper = async ({
  url,
  data,
  method = "get",
  showError = true,
}) => {
  debugger;
  var config = {
    method: method,
    url: process.env.REACT_APP_API_SERVER + url,
    headers: {
      "Content-Type": "application/json",
      xtoken: localStorage.getItem("token"),
    },
    data: data,
  };

  let resp = await axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      let er = error.request.response
        ? JSON.parse(error.request.response)
        : null;
      let msg = er?.msg
        ? er.msg
        : error.message === "Network Error"
        ? "Hay un problema de conexión, revisa tu conexión"
        : error.message;
      {
        showError &&
          Swal.fire({
            title: "¡Algo anda mal!",
            text: msg,
            icon: "error",
          });
      }

      return { ok: false, ...er };
    });
  return resp;
};
