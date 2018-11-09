const { tryCatch } = require('crocks')

const log = text => x => console.log(`${text}: ${x}`)

const fork = m => m.fork(
    log('Rejected'),
    log('Resolved')
)

const parse = tryCatch(JSON.parse)

module.exports = {
    fork,
    parse
}