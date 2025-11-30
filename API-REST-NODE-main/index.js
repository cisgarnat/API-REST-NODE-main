const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const usuarios = [
    { id: 1, nombre: "Juan", edad: 28 },
    { id: 2, nombre: "María", edad: 34 },
    { id: 3, nombre: "Pedro", edad: 45 }
];

app.get('/', (req, res) => {
    res.send("¡Hola mundo desde Express!");
});

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
    const { nombre, edad } = req.body;

    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre,
        edad
    };

    usuarios.push(nuevoUsuario);

    res.json({
        mensaje: "Usuario agregado exitosamente",
        usuario: nuevoUsuario
    });
});

app.put('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, edad } = req.body;

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    if (nombre) usuario.nombre = nombre;
    if (edad) usuario.edad = edad;

    res.json({
        mensaje: "Usuario actualizado correctamente",
        usuario
    });
});

app.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const eliminado = usuarios.splice(index, 1);

    res.json({
        mensaje: "Usuario eliminado",
        usuario_eliminado: eliminado[0]
    });
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
