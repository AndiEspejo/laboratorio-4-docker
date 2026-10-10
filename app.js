const express = require('express');

const app = express();
const PUERTO = process.env.PORT || 3000;

// Ruta principal, solo muestra un mensaje
app.get('/', (req, res) => {
  res.send('¡Hola desde Docker! Laboratorio 4 - UdeA');
});

// Suma dos numeros que llegan por query, ej: /sumar?a=5&b=3
app.get('/sumar', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).json({ error: 'Debes enviar a y b como numeros. Ej: /sumar?a=5&b=3' });
  }

  res.json({ a, b, resultado: a + b });
});

// Para revisar rapido que el contenedor esta vivo
app.get('/salud', (req, res) => {
  res.json({ estado: 'ok', hora: new Date().toISOString() });
});

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en puerto ${PUERTO}`);
});
