const postcss = require('postcss');
const Px2rem = require('px2rem');

const PostcssPx2rem = postcss.plugin('postcss-px2rem', function(options) {
  return function(css, result) {
    const oldCssText = css.toString();
    const px2remIns = new Px2rem(options);
    const newCssText = px2remIns.generateRem(oldCssText);
    const newCssObj = postcss.parse(newCssText);
    result.root = newCssObj;
  };
});

module.exports = {
  plugins: [
    require('precss')({
      parser: require('postcss-scss'),
    }),
    PostcssPx2rem({ remUnit: 75 }),
    require('cssnano')({
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['> 5% in CN'],
      },
      discardComments: {
        removeAll: false,
        // 为true会影响px2rem
      },
      discardUnused: false,
      mergeIdents: false,
      reduceIdents: false,
      safe: true,
    })
  ],
};
