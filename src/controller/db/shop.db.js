const shop_db = require('../../model/shops');
module.exports = {
    dbAddOneShop: async shop => {
        let result = null;
        if(!shop) return result;
        result = await shop_db.create(shop).then(r => r).catch(err => err);
        return result;
    },
    dbFindOneShop: async domain =>{
        let result = null;
        if(!domain) return result;
        result = await shop_db.findOne({ 'shop_domain': domain }).lean().exec().then(r => r).catch(err => err);
        return result;
    },
    dbUpdateDocumentShop: async (domain, type, objValue) => {
        let result = null;
        if(!domain || !type || !objValue) return result;
        result = await shop_db.findOneAndUpdate({ 'shop_domain': domain }, { $set: { [type]: objValue } }, { new: true}).lean().exec().then(r => r).catch(err => err);
        return result;
    },
    dbFindDataShopWithField: async (domain, fields) => {
        let result = null;
        if(!domain || !fields) return result;
        result = await shop_db.findOne({ 'shop_domain': domain }).select(fields).lean().exec().then(r => r ).catch(err => err);
        return result;
    }
}