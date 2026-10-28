// Node-RED's settings for NibePi: the defaults of the Node-RED version the
// release installs, with a password on the editor. The dashboard at /ui is
// not affected.
const fs = require('fs');
const settings = require('/opt/nibepi/data/nibepi-flow/node_modules/node-red/settings.js');
const hashFile = '/etc/nibepi-node-red/editor-password.hash';

if (fs.existsSync(hashFile)) {
    settings.adminAuth = {
        type: 'credentials',
        users: [{
            username: 'admin',
            password: fs.readFileSync(hashFile, 'utf8').trim(),
            permissions: '*'
        }]
    };
} else {
    // No password yet: keep NibePi running, but without the editor.
    settings.httpAdminRoot = false;
}

module.exports = settings;
