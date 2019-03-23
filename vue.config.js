module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/main.scss";`,
      },
    },
    sourceMap: true,
  },

  lintOnSave: undefined,
};
