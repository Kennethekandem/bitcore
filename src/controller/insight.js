const axios = require('axios');

class InsightController {

    static getInsight = async (address) => {

        let utxo;

        await axios.get(`https://sochain.com/api/v2/get_tx_unspent/BTCTEST/${address}`)
            .then((response) => {
                utxo = response.data
            })
            .catch((error) => {
                console.log(error);
            })

        return utxo;
    }
}

module.exports = InsightController
