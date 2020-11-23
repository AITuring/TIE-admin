//跨域代理前缀
const API_PROXY_PREFIX='https://api.xhboke.com/today/v1'
const TODAY_URL = 'https://api.xhboke.com/'
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
// const BASE_URL = process.env.VUE_APP_API_BASE_URL
module.exports = {
  LOGIN: `${BASE_URL}/login`,
  ROUTES: `${BASE_URL}/routes`,
  GOODS: `${BASE_URL}/goods`,
  TODAY: `${TODAY_URL}/today/v1`
}
