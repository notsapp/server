const { Schema, model, models } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: false },
  given_name: { type: String, required: false },
  family_name: { type: String, required: false },
  middle_name: { type: String, required: false },
  nickname: { type: String, required: false },
  preferred_username: { type: String, required: false },
  profile: { type: String, required: false },
  picture: { type: String, required: false },
  website: { type: String, required: false },
  email: { type: String, required: false },
  email_verified: { type: Boolean, required: false },
  gender: { type: String, required: false },
  birthdate: { type: String, required: false },
  zoneinfo: { type: String, required: false },
  locale: { type: String, required: false },
  phone_number: { type: String, required: false },
  phone_number_verified: { type: Boolean, required: false },
  address: { type: String, required: false },
  updated_at: { type: String, required: false },
  sub: { type: String, required: false },
  key: { type: [Schema.Types.Mixed], required: false },
});

const messageSchema = new Schema({
  createdDate: { type: String, required: true },
  createdTime: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: userSchema, required: true },
});

const User = models.User || model("User", userSchema);
const Message = models.Message || model("Message", messageSchema);

module.exports = {
    User,
    Message
}
