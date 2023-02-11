const Users = require("../models/users.models");

const findAllUsers = async () => {
  const data = await Users.findAll();
  return data;
};
const findUserById = async (id) => {
  //! const data = await productDB.find(product => product.id === id)
  //! return data
  const data = await Users.findOne({
    where: {
      id: id,
    },
  });
  return data;
};

const createNewUser = async (userObj) => {
  const newUsers = {
    title: userObj.title,
    price: userObj.price,
    imageUrl: userObj.imageUrl,
  };

  const data = await Users.create(newUsers);
  return data;
};

const updateUser = async (id, userObj) => {
  const data = await Users.update(userObj, {
    where: {
      id: id,
    },
  });
  return data[0]; //? Accedemos a la posicion 0 para retornar directamente la confirmacion (0 o 1)
  //? [1] -> La cantidad de productos que se modificaron
  //? [0] -> Error en caso de que el where no haya encontrado coincidencias -> el id no existe
};

const deleteUser = async (id) => {
  const data = await Users.destroy({
    where: {
      id: id,
    },
  });
  return data;
  //? 1 -> confirmacion de que el producto se elimino correctamente
  //? 0 -> El id que le mandamos no existe
};

module.exports = {
  findAllUsers,
  findUserById,
  createNewUser,
  updateUser,
  deleteUser,
};
