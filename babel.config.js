module.exports = function (api) {
  const presets = [
  ];

  const plugins = [
    '@babel/plugin-syntax-jsx',
    '@babel/plugin-transform-react-jsx',
  ];

  api.cache(false);

  return {
    presets,
    plugins
  };
};
