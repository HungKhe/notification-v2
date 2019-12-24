module.exports = {
    name: 'Inspired - Notification',
    scope_web: 'web.write_contents web.read_contents web.write_themes web.read_themes web.write_script_tags web.read_script_tags',
    scope_ecom: 'com.write_salechannels com.read_salechannels com.write_inventories com.read_inventories com.write_shippings com.read_shippings com.write_customers com.read_customers com.write_shipping_zones com.read_shipping_zones com.write_products com.read_products com.write_orders com.read_orders',
    redirect_url_login: 'http://localhost:8888/api/login',
    redirect_url_install: 'http://localhost:8888/api/grandservice',
    login_callback_url: 'http://localhost:8888/api/login',
    install_callback_url: 'http://localhost:8888/api/grandservice',
    webhook: {
        hrVerifyToken: 'A9CmqLD8q9DPvX5Zw3PyXfhgyMYwz6dnsqSq2dL',  
        subscribe: 'https://webhook.haravan.com/api/subscribe'
    },
    response_mode: 'form_post',
    url_authorize: 'https://accounts.haravan.com/connect/authorize',
    url_connect_token: 'https://accounts.haravan.com/connect/token',
    grant_type: 'authorization_code',
    nonce: 'L9KR4EYEAv',
    response_type: 'code id_token',
    app_id: '334f783d747a8fb31cf3c93a841d4778',
    app_secret: 'b3ddfa1e6e07416cc3ec0e18f91e0164de9603362bee62a0289554a8de7dd1e5',
    scope_login: 'openid profile email org userinfo',
    scope: 'offline_access openid profile email org userinfo com.read_products wh_api grant_service',
}

//https://randomkeygen.com/
// https://accounts.haravan.com/connect/authorize?response_mode=form_post&response_type=code id_token&scope=openid profile email org userinfo&client_id=334f783d747a8fb31cf3c93a841d4778&redirect_uri=http://localhost:8888/api/login&nonce=L9KR4EYEAv