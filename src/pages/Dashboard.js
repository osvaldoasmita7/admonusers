import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { useBackend } from "../hooks/useBackend";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

const INITIAL_STATE = {
  id: "",
  name: "",
  firstname: "",
  lastname: "",
  username: "",
};
export const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(INITIAL_STATE);
  const { getUser, postUser, putUser, resetPassword } = useBackend();
  const columns = [
    "Nombre(s)",
    "Apellido Paterno",
    "Apellido Materno",
    "Email",
    "Acciones",
  ];

  const options = {
    responsive: "vertical",
    selectableRowsHideCheckboxes: true,
    textLabels: {
      body: {
        noMatch: "No se encontraron registros",
        toolTip: "Ordernar",
        columnHeaderTooltip: (column) => `Ordenando por ${column.label}`,
      },
      pagination: {
        next: "Siguiente página",
        previous: "Página anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver columnas",
        filterTable: "Filtrar tabla",
      },
      filter: {
        all: "Todos",
        title: "Filtros",
        reset: "Restablecer",
      },
      viewColumns: {
        title: "Mostrar columnas",
        titleAria: "Mostrar/Ocultar columnas",
      },
      selectedRows: {
        text: "Fila(s) seleccionada(s)",
        delete: "Remover",
        deleteAria: "Fila removida",
      },
    },
  };
  const { getUsers } = useBackend();
  useEffect(() => {
    getData();
  }, []);

  const getInfoUser = async (userId) => {
    setUser(INITIAL_STATE);
    let resp = await getUser(userId);
    if (resp.ok)
      setUser({
        name: resp.name,
        firstname: resp.firstname,
        lastname: resp.lastname,
        username: resp.username,
        email: resp.email,
        id: resp.id,
      });
  };
  const getData = async () => {
    setLoading(true);
    let resp = await getUsers();
    setLoading(false);
    if (resp.ok) {
      let array = [];
      resp.usuarios.map((user) => {
        array.push([
          user.firstname,
          user.lastname,
          user.username,
          user.email,
          <Button
            variant="primary"
            onClick={() => {
              handleShow();

              getInfoUser(user.id);
            }}
          >
            Ver más
          </Button>,
        ]);
      });
      setUsers([...array]);
    }
  };
  const handleChangeUser = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const save = async (event) => {
    setLoading(true);
    event.preventDefault();
    let resp = null;
    debugger;
    if (user.id) {
      resp = await putUser(user);
    } else {
      let obj = user;
      obj.password = "123456";
      resp = await postUser(obj);
    }
    setLoading(false);

    if (resp.ok) {
      Swal.fire({
        title: "¡Usuario guardado con éxito!",
        text: user.id
          ? "El usuario ha sido actualizado con éxito"
          : "El usuario ha sido guardado en la base de datos correctamente con la siguiente contraseña: 123456",
        icon: "success",
      });
      handleClose();
      getData();
    }
  };
  const requestChangePassword = async () => {
    setLoading(true);
    let resp = await resetPassword();
    setLoading(false);
    if (resp.ok) {
      Swal.fire({
        title: "¡Contraseña restablecida!",
        text: "La nueva contraseña es 123456",
        icon: "success",
      });
    }
  };
  return (
    <>
      {loading ? <div class="spinner"></div> : ""}
      <div className="col-12 text-right px-5">
        <Button
          variant="primary my-4"
          onClick={() => {
            handleShow();
            setUser(INITIAL_STATE);
          }}
        >
          Nuevo usuario
        </Button>
      </div>
      <div className="col-12 px-5">
        <MUIDataTable
          title={"Usuarios registrados"}
          data={users}
          columns={columns}
          options={options}
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Información de usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            Nombre(s):
            <input
              className="form-control my-2"
              value={user.firstname}
              onChange={handleChangeUser}
              name="firstname"
            ></input>
            Apellido(s):
            <input
              className="form-control my-2"
              onChange={handleChangeUser}
              value={user.lastname}
              name="lastname"
            ></input>
          </h5>
          <h5>
            Nombre de usuario:{" "}
            <input
              className="form-control my-2"
              onChange={handleChangeUser}
              value={user.username}
              name="username"
            ></input>
          </h5>
          <h5>
            Email:
            <input
              className="form-control my-2"
              onChange={handleChangeUser}
              value={user.email}
              type="email"
              name="email"
            ></input>
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={save} disabled={loading}>
            Guardar cambios
          </Button>
          {user.id && (
            <Button
              variant="primary"
              onClick={requestChangePassword}
              disabled={loading}
            >
              Restablecer contraseña
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
