'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const getClientEnvironment = require('../config/env');
const paths = require('../config/paths');
const configFactory = require('../config/webpack.config');
const createDevServerConfig = require('../config/webpackDevServer.config');
const semver = require('semver');
const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));
const clearConsole = require('react-dev-utils/clearConsole');
const openBrowser = require('react-dev-utils/openBrowser');
const react = require(require.resolve('react', { paths: [paths.appPath] }));
const isInteractive = process.stdout.isTTY;

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const { checkBrowsers } = require('react-dev-utils/browsersHelper');
const { choosePort, createCompiler, prepareProxy, prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');

checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    // We attempt to use the default port but if it is busy, we offer the user to
    // run on a different port. `choosePort()` Promise resolves to the next free port.
    return choosePort(HOST, DEFAULT_PORT);
  })
  .then((port) => {
    if (port == null) {
      // We have not found a port.
      return;
    }

    const config = configFactory('development');
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const appName = require(paths.appPackageJson).name;
    const urls = prepareUrls(protocol, HOST, port, paths.publicUrlOrPath.slice(0, -1));
    // const devSocket = {
    //   warnings: (warnings) => devServer.sockWrite(devServer.sockets, 'warnings', warnings),
    //   errors: (errors) => devServer.sockWrite(devServer.sockets, 'errors', errors),
    // };
    // Create a webpack compiler that is configured with custom messages.
    const compiler = createCompiler({
      appName,
      config,
      urls,
      webpack,
    });
    // Load proxy config
    const proxySetting = require(paths.appPackageJson).proxy;
    const proxyConfig = prepareProxy(proxySetting, paths.appPublic, paths.publicUrlOrPath);
    // Serve webpack assets generated by the compiler over a web server.
    const serverConfig = createDevServerConfig(proxyConfig, urls.lanUrlForConfig);
    const devServer = new WebpackDevServer(compiler, serverConfig);
    // Launch WebpackDevServer.
    devServer.listen(port, HOST, (err) => {
      if (err) {
        return console.log(err);
      }
      if (isInteractive) {
        clearConsole();
      }

      if (env.raw.FAST_REFRESH && semver.lt(react.version, '16.10.0')) {
        console.log(chalk.yellow(`Fast Refresh requires React 16.10 or higher. You are using React ${react.version}.`));
      }

      console.log(chalk.cyan('Starting the development server...\n'));
      openBrowser(urls.localUrlForBrowser);
    });

    ['SIGINT', 'SIGTERM'].forEach((sig) => {
      process.on(sig, () => {
        devServer.close();
        process.exit();
      });
    });

    if (process.env.CI !== 'true') {
      // Gracefully exit when stdin ends
      process.stdin.on('end', () => {
        devServer.close();
        process.exit();
      });
    }
  })
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
