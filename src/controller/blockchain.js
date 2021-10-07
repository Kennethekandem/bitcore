const bitcore = require('bitcore-lib');
const CoinKey = require('coinkey');
const ci = require('coininfo');

const insight = require('./insight')

class Blockchain {

    static generate = async (req, res) => {

        try {

            const ck = CoinKey.createRandom();

            const private_key = ck.privateKey.toString('hex');
            console.log(private_key)

            const keyPair = new CoinKey(new Buffer.from(private_key, 'hex'));

            keyPair.versions = ci('BTC-TEST').versions;

            const address = keyPair.publicAddress;
            const wif = keyPair.privateWif;

            res.json({
                private_key,
                wif,
                address
            })

        }
        catch (e) {
            console.log(e);
        }

    }

    static createTransaction = async (req, res) => {
        const { address } = req.body;

        try {

            let utxo = await insight.getInsight(address)
            res.json(utxo);
        }
        catch (e) {
            console.log(e);
        }

        /*let insight = new Insight('testnet');
        insight.getUnspentUtxos(address, (err, utxos) => {

            if(err) {
                res.json(err);
            } else {
                console.log(utxos);
            }
        })*/
    }
}

module.exports = Blockchain
