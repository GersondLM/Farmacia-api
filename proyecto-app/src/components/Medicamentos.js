import React, { useState, useEffect } from "react";
import "../App.css";

const Medicamentos = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [nuevoMedicamento, setNuevoMedicamento] = useState({
    nombre: "",
    precio: "",
    stock: "",
    descripcion: "",
    fechaExpiracion: "",
    estatusPago: "",
  });
  const [editando, setEditando] = useState(null);

  // Cargar medicamentos desde la API
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/medicamentos")
      .then((response) => response.json())
      .then((data) => setMedicamentos(data))
      .catch((error) => console.error("Error al cargar los medicamentos:", error));
  }, []);

  // Agregar medicamento
  const agregarMedicamento = () => {
    console.log("Datos a enviar:", nuevoMedicamento);
    fetch("http://localhost:3000/api/v1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoMedicamento),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Respuesta del servidor:", data);
            setMedicamentos([...medicamentos, data]);
            setNuevoMedicamento({
                nombre: "",
                precio: "",
                stock: "",
                descripcion: "",
                fechaExpiracion: "",
                estatusPago: "",
            });
        });
    };


  // Editar medicamento
  const editarMedicamento = (id) => {
    const medicamentoActualizado = medicamentos.find((med) => med.id === id);
    setNuevoMedicamento(medicamentoActualizado);
    setEditando(id);
  };

  const guardarEdicion = () => {
    fetch(`http://localhost:3000/api/medicamentos${editando}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoMedicamento),
    })
      .then(() => {
        const medicamentosActualizados = medicamentos.map((med) =>
          med.id === editando ? nuevoMedicamento : med
        );
        setMedicamentos(medicamentosActualizados);
        setEditando(null);
        setNuevoMedicamento({
          nombre: "",
          precio: "",
          stock: "",
          descripcion: "",
          fechaExpiracion: "",
          estatusPago: "",
        });
      });
  };

  // Eliminar medicamento
  const eliminarMedicamento = (id) => {
    fetch(`http://localhost:3000/api/v1/medicamentos${id}`, {
      method: "DELETE",
    }).then(() => {
      const medicamentosFiltrados = medicamentos.filter((med) => med.id !== id);
      setMedicamentos(medicamentosFiltrados);
    });
  };

  return (
    <div>
      
      {/* Formulario para agregar o editar medicamentos */}
      <div className="formulario">
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoMedicamento.nombre}
          onChange={(e) =>
            setNuevoMedicamento({ ...nuevoMedicamento, nombre: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Precio"
          value={nuevoMedicamento.precio}
          onChange={(e) =>
            setNuevoMedicamento({ ...nuevoMedicamento, precio: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Stock"
          value={nuevoMedicamento.stock}
          onChange={(e) =>
            setNuevoMedicamento({ ...nuevoMedicamento, stock: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Descripción"
          value={nuevoMedicamento.descripcion}
          onChange={(e) =>
            setNuevoMedicamento({
              ...nuevoMedicamento,
              descripcion: e.target.value,
            })
          }
        />
        <input
          type="date"
          placeholder="Fecha de Expiración"
          value={nuevoMedicamento.fechaExpiracion}
          onChange={(e) =>
            setNuevoMedicamento({
              ...nuevoMedicamento,
              fechaExpiracion: e.target.value,
            })
          }
        />
        <select
          value={nuevoMedicamento.estatusPago}
          onChange={(e) =>
            setNuevoMedicamento({...nuevoMedicamento,
              estatusPago: e.target.value,
            })
          }
        >
          <option value="">Estatus de Pago</option>
          <option value="Pagado">Pagado</option>
          <option value="Pendiente">Pendiente</option>
        </select>
        <button
          onClick={editando ? guardarEdicion : agregarMedicamento}
          className="add-btn"
        >
          {editando ? "Guardar Cambios" : "Agregar"}
        </button>
      </div>

      <h1>Lista de Medicamentos</h1>

      {/* Tabla de medicamentos */}
      <table className="medicamentos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Descripción</th>
            <th>Fecha de Expiración</th>
            <th>Estatus de Pago</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map((medicamento, index) => (
            <tr key={medicamento.id}>
              <td>{index + 1}</td>
              <td>{medicamento.nombre}</td>
              <td>${medicamento.precio}</td>
              <td>{medicamento.stock}</td>
              <td>{medicamento.descripcion}</td>
              <td>{medicamento.fechaExpiracion}</td>
              <td>{medicamento.estatusPago}</td>

              <td>
                <button
                  onClick={() => editarMedicamento(medicamento.id)}
                  className="edit-btn"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarMedicamento(medicamento.id)}
                  className="delete-btn"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Medicamentos;
