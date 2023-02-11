//转换时间戳
export function renderTime(date) {
   // console.log(date)
   var dateee = new Date(date).toJSON();
   //+ 8 * 3600 * 1000
   return new Date(+new Date(dateee)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}
