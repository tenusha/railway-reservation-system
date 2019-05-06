const fetch = require("node-fetch");

module.exports = {
    validateNIC: function (nic) {
        return fetch('http://localhost:3001/gov/employee/' + nic)
            .then(handleErrors)
            .then(res => res.json())
            .then(data => {
                return data.validated
            })
            .catch(err => {
                console.log(err)
            })
    }
}
handleErrors = response => {
    if (!response.ok) {
        throw new Error("Request failed " + response.statusText)
    }
    return response
}