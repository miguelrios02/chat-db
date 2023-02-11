const express = require("express");

const usersRouter = require("./users/users.router");

const responseHandlers = require("./utils/handleResponses");
const db = require("./utils/database");
const initModels = require("./models/initModels");
const app = express();

app.use(express.json());

db.authenticate() //? Mostrar en consola de manera informativa si la conexion se hizo de manera correcta
  .then(() => {
    console.log("Las credenciales de la base de datos son correctas");
  })
  .catch((err) => {
    console.log(err); //! Errores de autenticacion (contraseña, usuario o hosts)
  });

db.sync() //? Sincronizar nuestra base de datos con los modelos que tenemos definidos
  .then(() => {
    console.log("La base de datos ha sido actualizada");
  })
  .catch((err) => {
    console.log(err); //! error en las tablas, propiedades, etc
  });

initModels();

app.get("/", (req, res) => {
  responseHandlers.success({
    res,
    status: 200,
    message: "Servidor inicializado correctamente",
    data: {
      users: "http://localhost:9000/api/v1/users",
      conversations: "http://localhost:9000/api/v1/conversations",
    },
  });
});

//? Esta debe ser la ultima ruta en mi app
app.use("*", (req, res) => {
  responseHandlers.error({
    res,
    status: 404,
    message: "URL not found, please try with http://localhost:9000/",
  });
});

app.use("/api/v1", usersRouter);
app.listen(9000, () => {
  console.log("Server started at port 9000");
});
