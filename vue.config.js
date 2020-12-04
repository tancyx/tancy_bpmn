// vue.config.js
module.exports = {
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('oneOf')
      .test(/\.(bpmn|cmmn|dmn)$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end();
  }
};
