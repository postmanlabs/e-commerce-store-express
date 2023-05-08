const Express = require('express');
const app = Express();
const cors = require('cors');
const { Sequelize } = require('sequelize');

const { port } = require('./config');

const AuthorizationRoutes = require('./authorization/routes');
const UserRoutes = require('./users/routes');

// Models START
const UserModel = require('./common/models/User');
// Models END

app.use(cors());

app.use(Express.json());

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './storage/data.db' // Specify the file name and path for your SQLite database
});

UserModel.initialise(sequelize);

sequelize.sync()
  .then(() => {
    console.log('Sequelize Initialised!!')

    app.sequelize = sequelize;

    app.use('/', AuthorizationRoutes);
    app.use('/user', UserRoutes);

    app.listen(port, () => {
      console.log('Server Listening on PORT:', port);
    })
  })
  .catch((err) => {
    console.error('Sequelize Initialisation threw an error:', err);
  })

