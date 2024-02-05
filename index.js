const express = require('express'),
  cors = require('cors'),
  app = express(),
  router = express.Router(),
  bodyParser = require("body-parser")


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const db = require('./app/models/index');
const adminRoutes = require('./app/routes/dashboard/admin')
const SuperAdminRoutes = require("./app/routes/others/SuperAdmin")
const products = require("./app/routes/dashboard/products")
const userRoutes = require('./app/routes/others/user');
const authenticateJWT = require('./app/routes/others/auth');
const { login } = require('./app/controllers/Admin/Admin');
const unprotectedRoutes = require("./app/routes/dashboard/unprotectedRoutes")
const dashboardRoutes = require("./app/routes/web/websiteRoutes"); 



// app.use("/admin", adminRoutes);
// app.use("/super-admin", SuperAdminRoutes)
// app.use("/products", products)
// app.use('/user', userRoutes);

// Apply authentication middleware to routes that require authentication
app.use('/admin', authenticateJWT, adminRoutes);
app.use('/super-admin', authenticateJWT, SuperAdminRoutes);
app.use('/products', authenticateJWT, products);
app.use('/main', unprotectedRoutes);
app.use('/dashboard', dashboardRoutes);


// app.use('/user', authenticateJWT, userRoutes); // Uncomment this line if you want to protect the user routes


app.get('/api/test', (req, res) => {
  res.send('Server is Up!');
});

db.sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(process.env.PORT || 3000);
    //pending set timezone
    console.log('App listening on port ' + process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log("err", err);
  });