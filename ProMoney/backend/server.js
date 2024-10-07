const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const incomeRoutes = require('./routes/incomes');
const expenseRoutes = require('./routes/expenses');
const savingsRoutes = require('./routes/savings');
const categoriesRoutes = require('./routes/categories');
const totalsRoutes = require('./routes/totals');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/incomes', incomeRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/savings', savingsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/totals', totalsRoutes);

mongoose.connect('mongodb+srv://alexrbdev:ventilador@prueba.med1z2v.mongodb.net/')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
