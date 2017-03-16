Disclaimer: you should use this plugin with minified css only.

### What it does

[![Greenkeeper badge](https://badges.greenkeeper.io/CoorpAcademy/css-wrapper-webpack-plugin.svg)](https://greenkeeper.io/)

Providing your minified `styles.css` is:
```
.plop {opacity: .5;}.plup {height: 12px;}
```

the final css will be wrapped with your container
```
#app .plop {opacity: .5;}#app .plup {height: 12px;}
```

### Usage
require the plugin
```
const WebpackCSSWrapperPlugin = require('@coorpacademy/webpack-css-wrapper');
```

then within your webpack plugins:
```
  plugins: [
    new ExtractTextWebpackPlugin('styles.css'),
    new WebpackCSSWrapperPlugin('styles.css', '#app')
  ]
```

