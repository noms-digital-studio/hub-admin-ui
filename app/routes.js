var express = require('express');

module.exports = function Routes(hubAdminClient, logger) {

    var router = express.Router();

    // Route index page
    router.get('/', function (req, res) {
        res.render('index');
    });

    router.get('/upload-prospectus', function (req, res) {
        res.render('upload-prospectus');
    });


    router.post('/upload-complete', function (req, res) {

        var title = req.body.prospectusTitle;
        var file = req.files.prospectusFile;

        hubAdminClient.upload(title, file, function (error, status) {
            if (error === null) {
                res.render('upload-complete', {status: status});
            } else {
                logger.error('File upload error:', error);
                res.locals.message = error.message;
                res.status(error.status || 500);
                res.locals.error = req.app.get('env') === 'development' ? error : {};
                res.render('error');
            }
        });

    });

    return {
        router: router
    };

};

