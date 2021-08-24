// import { demoTheme } from '@/build/index'
module.exports = {
  outputDir : 'shop_manage',
  css: {
    loaderOptions: {
      //向css相关的loader传递选项
      less: {
        lessOptions: {
          modifyVars: {
          },
          javascriptEnabled: true
        }
      }
    }
  },
};

