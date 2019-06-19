const program = require( 'commander' );
const path = require('path');
const colors = require('colors');
const pkg = require('../package.json');
const copydir = require('copy-dir');

function help() {
    console.log('基本命令：zzc-react-native-cli <ProjectName>'.blue);
    process.exit();
}

program
    .version(pkg.version, '-v, --version')  
    .option( '-h, --help', 'zzc-react-native-cli <ProjectName>', help )
    .option( '-n, --name <String>', 'project name' )
    .parse( process.argv );


const cli = {};

async function run() {
    const PROJECT_NAME = program.name;
    const CURR_PATH = process.cwd();
    const TEMPLATE_PATH = path.join(__dirname, '../template');
    copydir.sync(TEMPLATE_PATH, CURR_PATH,{
        utimes: true,  // keep add time and modify time
        mode: true,    // keep file mode
        cover: true    // cover file when exists, default is true
      });
}

cli.run = run;


module.exports = cli;