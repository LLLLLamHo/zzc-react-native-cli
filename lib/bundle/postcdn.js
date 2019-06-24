const postCDN = require('zzc-post-cdn');
const CND_PATH = '//imgcdn50.zuzuche.com/assets/book/';
module.exports = (type, zipPath) => {
    console.log('==============')
    console.log('开始上传cdn'.green)
    console.log(zipPath);
    return new Promise((resole, reject) => {
        postCDN({
            cwd: zipPath,
            remotePath: `rn/${type}`,
            remoteAuth: '[8k3fahKFe}9Eu6E9[p?z#BWifxsyy',
            uploadError: function (err, response, body) {
                console.dir(err);
                console.dir(body);
                reject(null);
            },
            uploadSuccess: function (err, response, body) {
                console.dir(err);
                console.dir(body);
                resole(`${CND_PATH}/rn/${type}/rn-${pkg.version}.zip`);
            }
        });
    });
}