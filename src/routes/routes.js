const express = require('express');
const router = express.Router();
const config = require('../../config');
const oauthCtrl = require('../controller/install/oauth.ctrl');
const uploadCtrl = require('../controller/upload/upload.ctrl');
const webhook = require('../helper/webhook');

router.route('/webhooks')
    .get((req, res) => {
        const { query } = req;
        if(config.webhook.hrVerifyToken === query['hub.verify_token']){
            res.status(200).send(query['hub.challenge'])
        } else {
            res.status(401).end();
        }
    })
    .post(webhook.webhookValidate, webhook.webhookListeningEvent)

router.route('/login')
    .get(oauthCtrl.appGetLogin)
    .post(oauthCtrl.appInstallLogin)

router.route('/grandservice')
    .post(oauthCtrl.appGetAccessToken)

router.route('/upload')
    .post(uploadCtrl.initUploadImage)

module.exports = router;