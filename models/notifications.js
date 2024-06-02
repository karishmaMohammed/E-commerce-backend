const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
  member_id: {type: mongoose.Types.ObjectId, ref: 'member'},
  member_photo :{type : String, ref: 'member'},
  member_name: {type : String, ref: 'member'}, 
  notification_title: {type : String},
  is_read: {type : Boolean},
  notify_type: {type : String},
},{
  timestamps: true,
});

notificationSchema.index([{ member_id: 1 }]);

const notificationModel = mongoose.model('notifications', notificationSchema);
module.exports = { notificationModel }

