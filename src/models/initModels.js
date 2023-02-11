const Participants = require("./participants.models");
const Users = require("./users.models");
const Conversations = require("./conversations.models");
const Messages = require("./messages.models");

const initModels = () => {
  Participants.belongsTo(Users);
  Users.hasMany(Participants);
  Participants.belongsTo(Conversations);
  Conversations.hasMany(Participants);
  Messages.belongsTo(Participants);
  Participants.hasMany(Messages);
};

module.exports = initModels;
