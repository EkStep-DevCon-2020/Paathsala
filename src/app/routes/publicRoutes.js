const proxyHeaders = require('../proxy/proxyUtils.js')
const proxy = require('express-http-proxy')
const bodyParser = require('body-parser')
const permissionsHelper = require('../helpers/permissionsHelper.js')
const envHelper = require('../helpers/environmentVariablesHelper.js')
const contentProxyUrl = "https://devcon.sunbirded.org";
const contentServiceBaseUrl = envHelper.CONTENT_URL
const logger = require('sb_logger_util_v2')

module.exports = function (app) {
    const proxyReqPathResolverMethod = function (req) {
        return require('url').parse(contentProxyUrl + req.originalUrl).path
    }

    app.use('/api/course/v1/hierarchy/:id', permissionsHelper.checkPermission(), proxy(contentProxyUrl, {
        proxyReqPathResolver: (req) => {
            console.log('==hierarchy====', "action/content/v3/hierarchy/" + req.params.id);
            return "/action/content/v3/hierarchy/" + req.params.id;
        }
    }))
    app.use('/api/*', permissionsHelper.checkPermission(), proxy(contentProxyUrl, {
        proxyReqPathResolver: proxyReqPathResolverMethod
    }))
}

