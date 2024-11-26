const pool = require('../config/db');

// Listar todos los medicamentos
const getMedicamentos = async () => {
    const result = await pool.query('SELECT * FROM medicamentos');
    return result.rows;
};

// Obtener un medicamento por ID
const getMedicamentoById = async (id) => {
    const result = await pool.query('SELECT * FROM medicamentos WHERE id = $1', [id]);
    return result.rows[0];
};

// Agregar un nuevo medicamento
const addMedicamento = async (medicamento) => {
    const { nombre, precio, stock, descripcion, fechaExpiracion, estatusPago } = medicamento;
    const result = await pool.query(
        'INSERT INTO medicamentos (nombre, precio, stock, descripcion, fecha_expiracion, estatus_pago) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [nombre, precio, stock, descripcion, fechaExpiracion, estatusPago]
    );
    return result.rows[0];
};

// Actualizar un medicamento
const updateMedicamento = async (id, medicamento) => {
    const { nombre, precio, stock, descripcion, fechaExpiracion, estatusPago } = medicamento;
    const result = await pool.query(
        'UPDATE medicamentos SET nombre = $1, precio = $2, stock = $3, descripcion = $4, fecha_expiracion = $5, estatus_pago = $6 WHERE id = $7 RETURNING *',
        [nombre, precio, stock, descripcion, fechaExpiracion, estatusPago, id]
    );
    return result.rows[0];
};

// Eliminar un medicamento
const deleteMedicamento = async (id) => {
    const result = await pool.query('DELETE FROM medicamentos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    getMedicamentos,
    getMedicamentoById,
    addMedicamento,
    updateMedicamento,
    deleteMedicamento,
};
