const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.listen(3000, () => {
  console.log(`Servidor corriendo en http://localhost:3000`);
});