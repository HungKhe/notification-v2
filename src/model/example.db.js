const db = require('./model');
const schema = {
    user_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { 
        type: String, 
        required: true, 
        select: true
    }
};
const collectionName = "exampale";
const exampleSchema = new db.Schema(schema);
const Example = db.model(collectionName, exampleSchema);
module.exports = Example;