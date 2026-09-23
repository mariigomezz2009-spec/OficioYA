const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
const authRoutes = require('./routes/authRoutes');
const categoriasRoutes = require('./routes/categoriasRoutes');

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/categorias', categoriasRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 3000}`);
});
