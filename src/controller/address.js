const axios = require('axios');


class Address {
    static check = async (address) => {

        axios.get(`https://blockchain.info/rawaddr/17P96rQCMXsR8Rmn2RMFNPC4qNf1RaaUN7`)
    }
}

module.exports = Address;
