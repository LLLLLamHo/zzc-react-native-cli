const path = require( 'path' );
const fs = require('fs');
const copy = require('./copyFile');
const { log, info, error } = require('../log');
const warmPrompt = require('../warmPrompt');
const projectDependencies = require('../config/projectDependencies');
const projectScript = require('../config/projectScript');
const createDir = require('./createDir');

module.exports = async (projectName) => {
    const CURR_PATH = process.cwd();

    const dirName = await createDir();
    if ( !dirName ) {
        error('目录名称不能为空！');
        return null;
    }

    const PROJECT_PATH = path.join(CURR_PATH, dirName)

    const TEMPLATE_PATH = path.join( __dirname, '../../template' );
    const copyResult = await copy( TEMPLATE_PATH, PROJECT_PATH );
    const cwd_package = path.join(PROJECT_PATH, './package.json');
    const cwd_app = path.join(PROJECT_PATH, './app.json');

    

    // 写入project name
    if (fs.existsSync(cwd_package)) {
        let content = fs.readFileSync(cwd_package, 'utf8');
        let newContent = JSON.parse(content);
        newContent.name = projectName;
        newContent.dependencies = projectDependencies.dependencies;
        newContent.devDependencies = projectDependencies.devDependencies;
        newContent.scripts = projectScript;
        fs.writeFileSync(cwd_package, JSON.stringify(newContent, null,"\t"));
    }

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