const program = require( 'commander' );
const colors = require( 'colors' );
const pkg = require( '../package.json' );
const { log, info } = require('./log');
const init = require('./init');

function help () {
    info( '基本命令：zzc-react-native-cli <ProjectName>' );
    process.exit();
}

program
    .version( pkg.version, '-v, --version' )
    .option( '-h, --help', 'zzc-react-native-cli -n <Project Name> -i', help )
    .option( '-n --name <String>', 'project name' )
    .option( '-i --init', 'init project', () => {
        init(program.name)
    } )
    .parse( process.argv );

    