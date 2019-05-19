const common = require("../../lib/node");
const webpackUtil = common.webpack;
const paths = common.paths;
const _ = require("lodash");
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");
const pkg = require(paths.project("package.json"));

module.exports = function(env, argv) {
  const isNode = false;
  const isLibrary = true;
  const nameSpaceId = "alo";
  const useWorkBox = !isNode && !isLibrary;
  const useHtmlCreation = !isNode && !isLibrary;
  let useHot = true;
  let useCodeSplitting = !isLibrary;

  const envIsTesting = webpackUtil.envIsTesting(env);
  const envIsProd = process.env.NODE_ENV === "production";

  useHot = useHot && !envIsProd && !isNode && !envIsTesting;
  useCodeSplitting = useCodeSplitting && !envIsTesting && !isNode && !useHot;

  let nameSpaceConfig = require("../webpack.common-namespace.config")({
    env,
    argv,
    nameSpaceId,
    useCodeSplitting
  });
  let outputDir = nameSpaceConfig.output.path;
  let commonConfig = require("../webpack.common.config")({
    env,
    argv,
    isNode,
    outputDir,
    nameSpaceId
  });
  const envConfig = isNode
    ? require("../webpack.common-back.config.js")({ env, argv, isLibrary })
    : require("../webpack.common-front.config.js")({
        env,
        argv,
        nameSpaceId,
        useWorkBox,
        useCodeSplitting,
        useHot,
        outputDir,
        isLibrary,
        useHtmlCreation
      });

  let config = commonConfig;
  config = _.merge(config, envConfig);
  config = _.merge(config, nameSpaceConfig);

  if (envIsTesting) {
    const testingConfig = require("../webpack.common-testing.config.js")({
      env,
      argv
    });
    config = _.merge(config, testingConfig);
  }

  if (isLibrary) {
    // Add your custom library build settings here
    // config.output.library = [pkg.name, "[name]"];
    config.output.library = pkg.name;
  }

  if (!isNode) {
    // TODO: Add port config by backId
    // Example websocket proxy
    /*
    config.devServer.proxy = {
      "/faye": {
        target: "ws://localhost:20000/faye",
        ws: true
      }
    };

    config.output.publicPath = "/";

    config.devServer = {
      ...config.devServer,
      historyApiFallback: true
      // Add this if you use multiple domains for development / proxies
      // headers: { 'Access-Control-Allow-Origin': '*' }
    };
    */
  }

  config.plugins.filterWarnings = new FilterWarningsPlugin({
    exclude: /You're using the following Workbox configuration options:/
  });

  config = webpackUtil.normalizeConfig(config);
  return config;
};