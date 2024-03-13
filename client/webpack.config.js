const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [ // Add plugins for HtmlWebpackPlugin and WebpackPwaManifest to the webpack configuration so that they are available to the build process.
      new HtmlWebpackPlugin({
        template: './index.html', // Add a template for the HtmlWebpackPlugin.
        title: "Mully's Text Editor", // add title to the HtmlWebpackPlugin
      }),

      new WebpackPwaManifest({ // Add and configure workbox plugins for a service worker and manifest file.
        name: "Mully's Text Editor", // Add a name to the WebpackPwaManifest.
        short_name: 'Text Editor', 
        description: 'An application that allows you to type text.', 
        background_color: '#272822', // add background color from the CSS file
        theme_color: '#31a9e1', // add theme color from the navbar in CSS file
        start_url: '/', // start url for the service worker
        publicPath: '/', // this is the public path for the service worker
        fingerprints: false, // fingerprints (hash number) are disabled for the service worker
        inject: true, // makes sure that the manifest file is injected into the index.html file
        icons: [ // logo pulled from the src/images/logo.png file
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // pixel sizes for the icons so that they are available for different devices
            destination: path.join("assets", 'icons') // destination path for the icons from index.html
          }
        ]
      }),
      new InjectManifest({ // configure the InjectManifest plugin to use the src-sw.js file as the source service worker file.
        swSrc: './src-sw.js', // file name for the service worker to be created
        swDest: 'src-sw.js' // destination file name in dist build that will be created
      })
    ],

    module: {
      rules: [ // Add CSS loaders and babel to webpack.
        {
          test: /\.m?js$/, // testing for js files
          exclude: /(node_modules|bower_components)/, // exclude node_modules and bower_components
          use: { // use babel-loader to transpile js files.
            loader: 'babel-loader', 
            options: { // use @babel/preset-env and @babel/plugin-proposal-object-rest-spread for the babel-loader.
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'], // Add plugin for object rest spread and transform runtime.
            }
          }
        },
        {
          test: /\.css$/i, // testing for css files and allow the import of css files in the js files.
          use: ['style-loader', 'css-loader'] // use style-loader and css-loader for the css files.
        }
      ],
    },
  };
};
