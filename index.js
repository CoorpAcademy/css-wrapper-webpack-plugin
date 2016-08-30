const _ = require('lodash/fp')
const postcss = require('postcss');

const cssWrapperPostCSSPlugin = postcss.plugin(
  'css-wrapper-webpack-plugin',
  function(prefix) {
  return function (css) {
    css.walkRules(function (rule) {
      if (_.isEqual(_.get('parent.name', rule), 'keyframes'))
        return;

      const selector = rule.selector;
      rule.selector = _.pipe(
        _.split(','),
        _.map(
          _.pipe(
            _.trim,
            prefixer(prefix)
          )
        ),
        _.join(', ')
      )(selector);
    });
  }
});

const prefixer = function(prefix) {
  return function(selector) {
    return _.join(' ', [prefix, selector]);
  };
};

function WebpackCSSWrapperPlugin(file, container) {
  this.file = file;
  this.container = container;
}

WebpackCSSWrapperPlugin.prototype.apply = function(compiler) {
  const file = this.file;
  const container = this.container;

  compiler.plugin('emit', function(compilation, callback) {
    const source = compilation.assets[file].source();
    const processor = postcss([cssWrapperPostCSSPlugin(container)]);

    processor.process(source).then(result => {
      compilation.assets[file] = {
        source: () => result.css,
        size: () => result.css.length
      };
      callback()
    }, callback);
  });
};


module.exports = WebpackCSSWrapperPlugin;