// const bitcore = require('bitcore-lib')
const CoinKey = require('coinkey')
const ci = require('coininfo')

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

    static createTransaction = async () => {

    }
}

module.exports = Blockchain
