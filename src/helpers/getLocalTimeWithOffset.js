module.exports = function getLocalTimeWithOffset() {
    // Get local time as ISO string with offset at the end
    var now = new Date()
    var tzo = -now.getTimezoneOffset()
    var dif = tzo >= 0 ? '+' : '-'
    var pad = function(num) {
        var norm = Math.abs(Math.floor(num))
        return (norm < 10 ? '0' : '') + norm
    };
    return now.getFullYear() 
        + '-' + pad(now.getMonth()+1)
        + '-' + pad(now.getDate())
        + 'T' + pad(now.getHours())
        + ':' + pad(now.getMinutes()) 
        + ':' + pad(now.getSeconds())
        + '.' + pad(now.getMilliseconds())
        + dif + pad(tzo / 60) 
        + ':' + pad(tzo % 60)
}