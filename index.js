const express = require('express'),
  cors = require('cors'),
  app = express(),
  router = express.Router(),
  bodyParser = require("body-parser")


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const db = require('./app/models/index');
const adminRoutes = require('./app/routes/admin')
const SuperAdminRoutes = require("./app/routes/SuperAdmin")
const products = require("./app/routes/products")
const userRoutes = require('./app/routes/user');
const authenticateJWT = require('./app/routes/auth');
const { login } = require('./app/controllers/Admin');
const unprotectedRoutes = require("./app/routes/unprotectedRoutes")



// app.use("/admin", adminRoutes);
// app.use("/super-admin", SuperAdminRoutes)
// app.use("/products", products)
// app.use('/user', userRoutes);

// Apply authentication middleware to routes that require authentication
app.use('/admin', authenticateJWT, adminRoutes);
app.use('/super-admin', authenticateJWT, SuperAdminRoutes);
app.use('/products', authenticateJWT, products);
app.use('/main', unprotectedRoutes);

// app.use('/user', authenticateJWT, userRoutes); // Uncomment this line if you want to protect the user routes


app.get('/api/test', (req, res) => {
  res.send('Server is Up!');
});

db.sequelize
  .sync({ alter: false })
  .then(() => {
    app.listen(process.env.PORT || 3000);
    //pending set timezone
    console.log('App listening on port ' + process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log("err", err);
  });