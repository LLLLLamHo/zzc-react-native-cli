const path = require( 'path' );
const fs = require('fs');
const copy = require('./copyFile');
const { log, info } = require('../log');
const warmPrompt = require('../warmPrompt');
const packageConfig = require('../package.config');

module.exports = async (projectName) => {
    const CURR_PATH = process.cwd();
    const TEMPLATE_PATH = path.join( __dirname, '../template' );
    const copyResult = await copy( TEMPLATE_PATH, CURR_PATH );

    const cwd_package = path.join(CURR_PATH, './package.json');
    const cwd_app = path.join(CURR_PATH, './app.json');

    // 写入project name
    if (fs.existsSync(cwd_package)) {
        let content = fs.readFileSync(cwd_package, 'utf8');
        let newContent = JSON.parse(content);
        newContent.name = projectName;
        newContent.dependencies = packageConfig.dependencies;
        newContent.devDependencies = packageConfig.devDependencies;
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