const express = require('express')

const app = express()

app.use(express.static('./build'))

const port = process.env.PORT || 9003

module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err)
    }
})
