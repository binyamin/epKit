/**
 * @module epkit
 * @license MIT
 * @author Binyamin Aron Green (b3u)
 * @version 0.3.0
 */

module.exports = {
    check: require('./check').run,
    zip: require('./zip').run,
    serve: require('./serve').run
}