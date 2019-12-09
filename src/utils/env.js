/**
 * @description 环境变量
 * @author SOALIN
 * @date 2019/12/9 11:06
 */
const ENV = process.env.NODE_ENV
module.exports = {
  isDev: ENV === 'dev',
  isProd: ENV === 'production',
  isTest: ENV === 'test'
}
