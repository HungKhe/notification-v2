const oauth = require('../../helper/oauth')
module.exports = {
    appGetLogin: (req, res) => {
        let url = oauth.appBuildUrlLogin();
        res.redirect(url);
    },
    appInstallLogin: (req, res) => {
        let code = req.body.code;
        if (!code) {
            return res.send('Code not found in request');
        }
        let param_token = await oauth.appGetToken(code, config.login_callback_url);
        if (!param_token) {
            return res.send('Something went wrong!').status(400);
        }
        let userHR = oauth.appGetUserFromDecodeJwt(param_token);
        if (userHR.is_error) {
            return res.send(userHR.message).status(400);
        }

        if (!userHR.id || !userHR.orgname) {
            return res.send('Can not find user or org').status(400);
        }
        userHR.isRoot = 0;
        if (userHR.role) {
            if (_.isString(userHR.role)) {
                userHR.isRoot = userHR.role == 'admin' ? 1 : 0;
            } else {
                userHR.isRoot = userHR.role.includes('admin') ? 1 : 0;
            }
        }

        // Check database shop with userHR.orgid had exists in database and app not removed
        // if had shop and not removed then go to app
        // else if no shop or shop had removed then check
        // if userHR is root then call url install app
        // else response error not have access

        //under is case no shop or shop had removed
        if (userHR.isRoot) {
            let url = oauth.appBuildUrlInstall();
            res.redirect(url);
        } else {
            return res.send('You are not authorized to access this page!').status(401);
        }
    },
    appGetAccessToken: (req, res) => {
        let code = req.body.code;
        try {
            if (!code) return res.send('Code not found in request');
            let param_token = await oauth.appGetToken(code, config.install_callback_url);
            if (!param_token) return res.send('Something went wrong!').status(400);
            let userHR = oauth.appGetUserFromDecodeJwt(param_token);
            if (userHR.is_error) return res.send(userHR.message).status(400);
            if (!userHR.id || !userHR.orgname) return res.send('Can not find user or org');
            let authorizeInfo = {
                access_token: param_token.access_token,
                refresh_token: param_token.refresh_token,
                expires_in: param_token.expires_in
            };

            // authorizeInfo can save to database shop for reuse later

            //test request shop.json
            let shopData = await oauth.appGetShop(authorizeInfo.access_token);
            res.send(shopData);

            //if have use webhook, you need subscribe webhook with org token to use
            // await subscribe(authorizeInfo.access_token);
        } catch (err) {
            return res.send(err);
        }
    }
}