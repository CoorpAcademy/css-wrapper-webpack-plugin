function WebpackCSSWrapperPlugin(file, container) {
  this.file = file;
  this.container = container;
}

WebpackCSSWrapperPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', (compilation, callback) => {
    const source = compilation.assets[this.file].source();
    const newCss = source.replace(/}\./g, `}${this.container} .`);
    const wrappedCss = [`${this.container} `, newCss].join('');

    compilation.assets['styles.css'] = {
      source: () => wrappedCss,
      size: () => wrappedCss.length
    };

    callback();
  });
};

module.exports = WebpackCSSWrapperPlugin;
