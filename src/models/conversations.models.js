const { DataTypes } = require("sequelize");

const db = require("../utils/database");

const Conversations = db.define("conversations", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  profile_image: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  created_by: {
    type: DataTypes.UUID,
  },
  is_group: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Conversations;
