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
const userRoutes = require('./app/routes/user')


app.use("/admin", adminRoutes);
app.use("/super-admin", SuperAdminRoutes)
app.use("/products", products)
// app.use('/user', userRoutes);
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