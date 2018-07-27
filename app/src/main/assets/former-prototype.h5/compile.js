(do {
    'use strict';

    const req = Object.freeze(do {
        let req = {};
        [
            'fs',
            'child_process'
        ].forEach(lib => req[lib] = require(lib));
        req;
    });

    req.child_process.exec('cp node_modules/reset-css/reset.css tp/reset.css');
    req.child_process.exec('cp node_modules/bootstrap/dist/css/bootstrap.min.css tp/bootstrap.min.css');
    req.child_process.exec('cp node_modules/bootstrap/dist/css/bootstrap-grid.min.css tp/bootstrap-grid.min.css');
    req.child_process.exec('cp node_modules/bootstrap/dist/css/bootstrap-reboot.min.css tp/bootstrap-reboot.min.css');

    req.child_process.exec('cp node_modules/jquery/dist/jquery.min.js tp/jquery.min.js');
    req.child_process.exec('cp node_modules/bootstrap/dist/js/bootstrap.min.js tp/bootstrap.min.js');
    req.child_process.exec('cp node_modules/bootstrap/dist/js/bootstrap.bundle.min.js tp/bootstrap.bundle.min.js');

    req.fs.readdirSync('js/in').forEach(file => req.child_process.exec(`node_modules/.bin/babel --presets stage-0 js/in/${file} --out-file js/out/${file}`));
    req.child_process.exec('node_modules/less/bin/lessc index.less > index.css');
});