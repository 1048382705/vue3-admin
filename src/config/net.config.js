/**
 * @description 配置axios请求基础信息
 * @author hu-snail 1217437592@qq.com
 */

export const netConfig = {
  // axios 基础url地址
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : '/api',
  // 根据后端定义配置
  contentType: 'application/json;charset=UTF-8',
  //消息框消失时间
  messageDuration: 3000,
  //最长请求时间
  requestTimeout: 10000,
  //操作正常code，支持String、Array、int多种类型
  successCode: [200, 0],
  //登录失效code
  invalidCode: -1,
  //无权限code
  noPermissionCode: -1,
}
