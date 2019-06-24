const fs = require( 'fs' );
const path = require( 'path' );
const program = require( 'commander' );
const colors = require( 'colors' );
const pkg = require( '../package.json' );
const init = require( './init' );
const bundle = require( './bundle' );
const update = require('./update');
const warmPrompt = require( './warmPrompt' );

const CWD = process.cwd();

program
    .version( pkg.version, '-v, --version' );

program
    .command( 'init' )
    .alias( 'i' )
    .description( '初始化项目' )
    .option( '-n --name <String>', '初始化项目' )
    .action( ( opt ) => {
        if ( opt.name && opt.name != '' && typeof opt.name == 'string' ) {
            init( opt.name );
        } else {
            program.help();
        }
    } )

program
    .command( 'bundle' )
    .alias( 'b' )
    .description( '构建bundle文件' )
    .option( '-t --type <ios|android>', '构建bundle文件', 'all' )
    .option( '-d, --dev', '是否测试环境' )
    .option( '-c, --config <String>', '配置文件路径' )
    .action( ( opt ) => {
        const CONFIG_PATH = opt.config ? path.join( `${CWD}/${opt.config}` ) : path.join( `${CWD}/zrn.cli.config.js` );
        if ( fs.existsSync( CONFIG_PATH ) ) {
            const config = require( CONFIG_PATH );
            bundle( { type: opt.type, dev: opt.dev, bundleConfig: config } );
        } else {
            throw '缺少配置文件，在根目录下默认需要一个zrn.cli.config.js，或者通过-c <path>指定配置文件目录';
        }
    } )

program
    .command( 'update' )
    .alias( 'u' )
    .description( '更新依赖文件' )
    .action( ( opt ) => {
        update();
    } )

program.on( '--help', function () {
    console.log( '' )
    console.log( 'Examples:' );
    console.log( '  $ zrn init -n 你的项目名' );
    console.log( '  $ zrn bundle -t <ios|android>  --->  构建项目，不传-t默认ios和android一起构建' );
    console.log( '' );
    warmPrompt();

} );


program.parse( process.argv );
