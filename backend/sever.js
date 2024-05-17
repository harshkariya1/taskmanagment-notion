require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const { sequelize, testConnection } = require('./config/database');
const cors = require('cors');
const path=  require("path") 
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  withcrecredentials:true
}

));
app.use((req, res, next) => {
  console.log('Incoming Request:', req.method, req.url);
  console.log('Request Body:', req.body);
  next();
});


app.use("/assets", express.static(path.join(__dirname, "/public/assets/profilePics/")))
// Test the database connection
testConnection()
  .then(() => {
    // Routes
    app.use('/api', userRoutes);
    // app.use('/api', categoryRoutes);
    // app.use('/api', productRoutes);
    app.use('/api', taskRoutes);
    
    app.use((err, req, res, next) => {
      console.error('Error:', err);
      res.status(500).json({ error: 'Something went wrong!' });
    });
    

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to start server:', err);
  });
