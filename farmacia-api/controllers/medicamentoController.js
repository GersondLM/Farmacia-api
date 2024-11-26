const pool = require('../config/db');

exports.getMedicamentos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM medicamentos');
        const medicamentos = result.rows.map((med) => ({
            ...med,
            fechaExpiracion: med.fecha_expiracion,
            estatusPago: med.estatus_pago,
        }));
        res.json(medicamentos);
    } catch (error) {
        console.error('Error al obtener medicamentos:', error);
        res.status(500).json({ error: 'Error al obtener medicamentos' });
    }
};


exports.getMedicamentoById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM medicamentos WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Medicamento no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener medicamento:', error);
        res.status(500).json({ error: 'Error al obtener medicamento' });
    }
};

exports.createMedicamento = async (req, res) => {
    const { nombre, precio, stock, descripcion, fechaExpiracion, estatusPago } = req.body;
    
    if (!nombre || !precio || !stock || !descripcion || !fechaExpiracion || !estatusPago) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO medicamentos (nombre, precio, stock, descripcion, fecha_expiracion, estatus_pago) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [nombre, precio, stock, descripcion, fechaExpiracion, estatusPago]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear medicamento:', error);
        res.status(500).json({ error: 'Error al crear medicamento' });
    }
};

exports.updateMedicamento = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, stock, descripcion, fechaExpiracion, estatusPago } = req.body;
    try {
        const result = await pool.query(
            'UPDATE medicamentos SET nombre = $1, precio = $2, stock = $3, descripcion = $4, fecha_expiracion = $5, estatus_pago = $6 WHERE id = $7 RETURNING *',
            [nombre, precio, stock, descripcion, fechaExpiracion, estatusPago, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Medicamento no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar medicamento:', error);
        res.status(500).json({ error: 'Error al actualizar medicamento' });
    }
};

exports.deleteMedicamento = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM medicamentos WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Medicamento no encontrado' });
        }
        res.json({ message: 'Medicamento eliminado', medicamento: result.rows[0] });
    } catch (error) {
        console.error('Error al eliminar medicamento:', error);
        res.status(500).json({ error: 'Error al eliminar medicamento' });
    }
};
