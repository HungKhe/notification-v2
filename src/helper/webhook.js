const crypto = require('crypto');
module.exports = {
    webhookValidate: function (req, res, next) {
        let shop = req.headers['x-haravan-org-id'] || '';
        let signature = req.headers['x-haravan-hmac-sha256'] || '';
        let topic = req.headers['x-haravan-topic'] || '';
        let haravanBody = req.body.toString() || '';
        if (!shop || !signature || !topic) {
            return res.sendStatus(401);
        }

        var header = req.get('x-haravan-hmac-sha256');
        var token_secret = config.app_secret;

        var sh = crypto
            .createHmac('sha1', token_secret)
            .update(new Buffer(haravanBody, 'utf8'))
            .digest('hex');

        if (sh !== header) {
            return res.status(401).send();
        }

        next();
    },
    webhookListeningEvent: function (req, res) {
        let topic = req.headers['x-haravan-topic'] || '';
        let org_id = req.headers['x-haravan-org-id'] || '';
        switch (topic) {
            case "product/update": {
                res.sendStatus(200);
                console.log(req.body);
                break;
            }
            default:
                res.sendStatus(200);
                break;
        }
    }
}