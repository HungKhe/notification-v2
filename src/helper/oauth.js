const OAuth2 = require('oauth').OAuth2;
const querystring = require('querystring');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const request = require("request");
const config = require('../../config');
module.exports = {
    appBuildUrlLogin: function () {
        let objQuery = {
            response_mode: config.response_mode,
            response_type: config.response_type,
            scope: config.scope_login,
            client_id: config.app_id,
            redirect_uri: config.login_callback_url,
            nonce: config.nonce
        };
        let query = querystring.stringify(objQuery);
        return `${config.url_authorize}?${query}`;
    },
    appBuildUrlInstall: function () {
        let objQuery = {
            response_mode: config.response_mode,
            response_type: config.response_type,
            scope: config.scope,
            client_id: config.app_id,
            redirect_uri: config.install_callback_url,
            nonce: config.nonce
        };
        let query = querystring.stringify(objQuery);
        return `${config.url_authorize}?${query}`;
    },
    appGetToken: function (code, callback_url) {
        return new Promise((resolve => {
            try {
                let params = {};
                params.grant_type = config.grant_type;
                params.redirect_uri = callback_url;

                let _oauth2 = new OAuth2(
                    config.app_id,
                    config.app_secret,
                    '',
                    config.url_authorize,
                    config.url_connect_token,
                    ''
                );

                _oauth2.getOAuthAccessToken(code, params, (err, accessToken, refreshToken, param_token) => {
                    if (err) {
                        console.log('error', err);
                        resolve();
                    } else {
                        resolve(param_token)
                    }
                });
            } catch (error) {
                console.log('error', error);
                return resolve();
            }
        }))
    },
    appGetUserFromDecodeJwt: function (params) {
        try {
            let userHR = jwt.decode(params.id_token);
            if (!_.isObjectLike(userHR)) {
                return {
                    is_error: true,
                    message: 'Get User Info Failed'
                };
            }
            if (!userHR.id) {
                userHR.id = userHR.sub;
            }
            return userHR;
        } catch (e) {
            return {
                is_error: true,
                message: `Get User Info Failed ${e.message}`
            };
        }
    },
    appGetShop: function (access_token) {
        return new Promise(resolve => {
            let options = {
                method: 'GET',
                url: 'https://apis.haravan.com/com/shop.json',
                headers:
                {
                    authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                },
                json: true
            };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                resolve(body)
            });
        })
    }
}