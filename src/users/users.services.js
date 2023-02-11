const UserControllers = require("./users.controllers");
const handleResponses = require("../utils/handleResponses");

const getAllUsers = (req, res) => {
  UserControllers.findAllUsers()
    .then((data) => {
      handleResponses.success({
        res,
        data,
        status: 200,
        message: "All users collectred succesfully",
      });
    })
    .catch((err) => {
      handleResponses.error({
        res,
        data: err,
        status: 400,
        message: "se produjo un error al mostra todos los datos",
      });
    });
};

const getUserById = (req, res) => {
  const id = Number(req.params.id);

  UserControllers.findUserById(id)
    .then((data) => {
      if (data) {
        handleResponses.success({
          res,
          data,
          status: 200,
          message: "Product with id" + data.id,
        });
      } else {
        handleResponses.error({
          res,
          status: 404,
          message: "Producto no encontrado",
        });
      }
    })
    .catch((err) => {
      handleResponses.error({
        res,
        data: err,
        status: 400,
        message: "Se produjo un error al mostrar un producto",
      });
    });
};
const postNewUser = (req, res) => {
  const UserObj = req.body;
  UserControllers.createNewUser(UserObj)
    .then((data) => {
      handleResponses.success({
        res,
        data,
        status: 200,
        message: "the new user was created successfully",
      });
    })
    .catch((err) => {
      handleResponses.error({
        res,
        data: err,
        status: 400,
        message: "there was an error creating the new user",
      });
    });
};

const deleteUser = (req, res) => {
  const id = req.params.id;

  UserControllers.deleteUser(id)
    .then((data) => {
      if (data) {
        handleResponses.success({
          res,
          data,
          status: 204,
          message: "the user was deleted successfully",
        });
      } else {
        handleResponses.error({
          res,
          data: err,
          status: 404,
          message: "User not found",
        });
      }
    })
    .catch((err) => {
      handleResponses.error({
        res,
        data: err,
        status: 400,
        message: "an error occurred while deleting the user",
      });
    });
};

const patchUser = (req, res) => {
  const id = req.params.id;
  const UserObj = req.body;
  UserControllers.updateUser(id, UserObj)
    .then((data) => {
      if (data) {
        handleResponses.success({
          res,
          data,
          status: 200,
          message: `User with id: ${id} updated succesfully`,
        });
      } else {
        handleResponses.error({
          res,
          data: err,
          status: 404,
          message: "User not found",
        });
      }
    })
    .catch((err) => {
      handleResponses.error({
        res,
        data: err,
        status: 400,
        message: "an error occurred while updating the user",
      });
    });
};

const putUser = (req, res) => {
  const id = req.params.id;
  const UserObj = req.body;

  if (
    !UserObj.id ||
    !UserObj.first_name ||
    !UserObj.last_name ||
    !UserObj.email ||
    !UserObj.password ||
    !UserObj.profile_image ||
    !UserObj.phone
  ) {
    return handleResponses.error({
      res,
      data: err,
      status: 400,
      message: "Missing Data",
    });
  }

  UserControllers.updateUser(id, UserObj)
    .then((data) => {
      if (data) {
        handleResponses.success({
          res,
          data,
          status: 200,
          message: `User with id: ${id} updated succesfully`,
        });
      } else {
        handleResponses.error({
          res,
          data: err,
          status: 404,
          message: "User not found",
        });
      }
    })
    .catch((err) => {
      handleResponses.error({
        res,
        data: err,
        status: 400,
        message: "an error occurred while updating the user",
      });
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  postNewUser,
  deleteUser,
  patchUser,
  putUser,
};
