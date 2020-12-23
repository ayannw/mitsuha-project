const moment = require('moment')
const colors = require('ansi-colors')

exports.log = (text) => {
    return console.log(
`${colors.gray(moment().format('HH:mm:ss:SSS'))} [ info     ] ${text}`
    )
}
exports.success = (text) => {
    return console.log(
`${colors.gray(moment().format('HH:mm:ss:SSS'))} [ ${colors.greenBright('success')} ] ${text}`
    )
}
exports.warn = (text) => {
    return console.log(
`${colors.gray(moment().format('HH:mm:ss:SSS'))} [ ${colors.yellow('warning')} ] ${text}`
    )
}
exports.error = (text) => {
    return console.log(
`${colors.gray(moment().format('HH:mm:ss:SSS'))} [ ${colors.red('error')}   ] ${text}`
    )
}
