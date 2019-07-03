const path = require( 'path' );
const fs = require('fs');
const copy = require('./copyFile');
const { log, info, error } = require('../log');
const warmPrompt = require('../warmPrompt');
const projectDependencies = require('../config/projectDependencies');
const projectScript = require('../config/projectScript');
const createDir = require('./createDir');
const packageConfig = require('../../template/package.json');

module.exports = async (projectName, isCover) => {
    const CURR_PATH = process.cwd();

    const dirName = await createDir();
    if ( !dirName ) {
        error('目录名称不能为空！');
        return null;
    }

    const PROJECT_PATH = path.join(CURR_PATH, dirName)

    const TEMPLATE_PATH = path.join( __dirname, '../../template' );
    const cwd_package = path.join(PROJECT_PATH, './package.json');
    const cwd_app = path.join(PROJECT_PATH, './app.json');
    let currCWDPackageContent = null;

    if (fs.existsSync(cwd_package)) {
        let content = fs.readFileSync(cwd_package, 'utf8');
        currCWDPackageContent = JSON.parse(content);
    } else {
        currCWDPackageContent = packageConfig;
    }

    await copy( TEMPLATE_PATH, PROJECT_PATH, isCover );

    // 写入project name
    currCWDPackageContent.name = projectName;
    currCWDPackageContent.dependencies = Object.assign(currCWDPackageContent.dependencies, projectDependencies.dependencies);
    currCWDPackageContent.devDependencies = Object.assign(currCWDPackageContent.devDependencies, projectDependencies.devDependencies);
    currCWDPackageContent.devBundleConfig = Object.assign(currCWDPackageContent.devBundleConfig, projectDependencies.devBundleConfig);
    currCWDPackageContent.scripts = Object.assign(currCWDPackageContent.scripts, projectScript);;
    fs.writeFileSync(cwd_package, JSON.stringify(currCWDPackageContent, null,"\t"));

    // 写入app.json
    if (fs.existsSync(cwd_app)) {
        let content = fs.readFileSync(cwd_app, 'utf8');
        let newContent = JSON.parse(content);
        newContent.name = projectName;
        newContent.displayName = projectName;
        fs.writeFileSync(cwd_app, JSON.stringify(newContent,null,"\t"));
    }
    warmPrompt();
}