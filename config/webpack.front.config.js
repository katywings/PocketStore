const common = require("common");
const webpackUtil = common.webpack;
const paths = common.paths;
const _ = require("lodash");

module.exports = function(env, argv) {
  const isNode = false;
  const nameSpaceId = "front";
  const libraryName = null;
  const useWorkBox = true;
  let useHot = true;
  let useCodeSplitting = true;

  const envIsTesting = webpackUtil.envIsTesting(env);
  const envIsProd = process.env.NODE_ENV === "production";

  useHot = useHot && !envIsProd && !isNode && !envIsTesting;
  useCodeSplitting = useCodeSplitting && !envIsTesting && !isNode && !useHot;

  let nameSpaceConfig = require("./webpack.common-namespace.config")({
    env,
    argv,
    nameSpaceId,
    useCodeSplitting
  });
  let outputDir = nameSpaceConfig.output.path;
  let commonConfig = require("./webpack.common.config")({
    env,
    argv,
    isNode,
    outputDir
  });
  const envConfig = isNode
    ? require("./webpack.common-back.config.js")({ env, argv })
    : require("./webpack.common-front.config.js")({
        env,
        argv,
        nameSpaceId,
        useWorkBox,
        useCodeSplitting,
        useHot,
        outputDir
      });

  let config = commonConfig;
  config = _.merge(config, envConfig);
  config = _.merge(config, nameSpaceConfig);

  if (envIsTesting) {
    const testingConfig = require("./webpack.common-testing.config.js")({
      env,
      argv
    });
    config = _.merge(config, testingConfig);
  }

  if (libraryName) {
    config.output.library = libraryName;
  }

  if (!isNode) {
    // TODO: Add port config by backId
    config.devServer.proxy = {
      "/faye": {
        target: "ws://localhost:20000/faye",
        ws: true
      }
    };
  }

  config = webpackUtil.normalizeConfig(config);
  return config;
};
