require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
const fs = require('fs-extra')

var spinner = ora('building for production...')
spinner.start()


/* rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
}) */
// 调整打包逻辑
// 先打包到临时目录，最后再复制到实际打包目录
// 这样可以减少切换版本的时间，也减少打包失败造成不能访问的情况
let startTime = new Date()
console.log('开始打包：', startTime.toLocaleString())
rm(path.join(config.build.assetsRootTemp, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    // 俩种方式
    // 一种直接叠加，文件数量会越来越多，好处是访问基本能保证一直正常
    // 一种是清空替换，文件数量可控，坏处是访问有可能出现错误
    var copyTime = new Date()
   
    // 先清空原有文件
    // fs.emptyDir(path.join(config.build.assetsRoot), err => {
    //   if (err) throw err
      // 再迁移所有文件过去
      fs.move(path.join(config.build.assetsRootTemp), path.join(config.build.assetsRoot), { overwrite: true }, err => {
        if (err) return console.error(err)
          let endTime = new Date()
          
          process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
          }) + '\n\n')
      
          let buildTime =  (endTime.getTime() - startTime.getTime())/1000
          console.log('编译完成，编译花费：', (copyTime.getTime() - startTime.getTime())/1000 + ' 秒')
          console.log('')
          console.log('准备从临时目录复制到dist目录：')
          console.log('复制迁移完成，复制花费：', (endTime.getTime() - copyTime.getTime())/1000 + ' 秒')
          console.log('')
          console.log('完成打包：', endTime.toLocaleString())
          console.log('整个打包花费：',buildTime + ' 秒')

          console.log('')
          console.log('此次编译评分：')
          if(buildTime < 20){
            console.log('100分，恭喜您击败了全国90%的webpack编译速度~')
          } else if(buildTime < 60){
            console.log('90分，1分钟都不用，这个速度还是不错的。')
          } else if(buildTime < 120){
            console.log('70分，超过1分钟就是罪~')
          } else if(buildTime < 300){
            console.log('59分，这样的速度只能说差强人意~')
          } else{
            console.log('0分，就这龟速，咋不上天呢~')
          }

          console.log('')

          console.log(chalk.cyan('  Build complete.\n'))
          console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ))
      })
    
          // fse.copy(path.join(config.build.assetsRootTemp, config.build.assetsSubDirectory),path.join(config.build.assetsRoot, config.build.assetsSubDirectory))
          
    // })
    
    
  })
})
