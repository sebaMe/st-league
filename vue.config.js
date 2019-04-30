// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        data: `@import "@/css/colors.scss"; @import "@/css/mixins.scss"; @import "@/css/animations.scss";`
      }
    }
  }
};
