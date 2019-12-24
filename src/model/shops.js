const db = require('./model');
const schema = {
    shop_domain: String,
    shop_email: String,
    access_token: String,
    refresh_token: String,
    list_notify: [
        {
            _id: { type: mongoose.Schema.ObjectId, auto: true },
            notifyName : String,
            notifyType : String,
            notifyIcon : String,
            notifyLink : String,
            notifyContent : String,
            notifyLogin: Boolean,
            notifyStatus: Boolean,
            notifyCreateTime: String
        }
    ]
};
const collectionName = "shops";
const shopSchema = new db.Schema(schema);
const Shop = db.model(collectionName, shopSchema);
module.exports = Shop;