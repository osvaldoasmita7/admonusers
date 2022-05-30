import React, { useContext, useEffect, useState } from "react";
import { Input } from "antd";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  useEffect(() => {
    verifyLogin();
  });
  const verifyLogin = async () => {
    if (localStorage.getItem("token")) {
      window.location.href = "/dashboard";
      navigate("/dashboard");
    }
  };
  const [form, setForm] = useState({
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const send = async (event) => {
    event.preventDefault();
    setLoading(true);
    let resp = await login(form.username, form.password);
    setLoading(false);
    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      navigate("/dashboard");
    }
  };
  return (
    <div className="row">
      <form
        className="col-12 col-md-6 col-lg-4 mx-auto text-center mt-5"
        onSubmit={send}
      >
        <h1 className="display-2">Inicia sesión</h1>
        <h5 className="text-left" style={{ fontWeight: 100 }}>
          Nombre de usuario
        </h5>
        <Input
          placeholder="----"
          className="mb-4"
          value={form.username}
          name="username"
          onChange={handleChange}
          required
        />
        <h5 className="text-left" style={{ fontWeight: 100 }}>
          Contraseña
        </h5>
        <Input
          placeholder="*****"
          className="mb-4"
          type={"password"}
          value={form.password}
          name="password"
          onChange={handleChange}
          required
        />
        <input
          className="btn btn-primary btn-lg"
          style={{ fontWeight: 100 }}
          type="submit"
          value={"Continuar"}
          disabled={loading}
        ></input>
      </form>
    </div>
  );
};
