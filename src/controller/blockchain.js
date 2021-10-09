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

            let tx = await bitcore.Transaction();
            tx.from(utxo);
            tx.to(10000);

            tx.serialize();

        }
        catch (e) {
            console.log(e);
        }
    }
}

module.exports = Blockchain
