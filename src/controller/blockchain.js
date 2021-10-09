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
        const { address, to_address } = req.body;

        try {

            let get_utxo = await insight.getInsight(address)

            let get_latest = get_utxo[get_utxo.length -1];

            var utxo = {
                "txId": get_latest.txid,
                "outputIndex": get_latest.output_no,
                "address": address,
                "script": get_latest.script_hex,
                "satoshis": parseInt(get_latest.value)
            }

            var tx = new bitcore.Transaction()
                .from(utxo)
                .to(to_address, 10000)
                .change(address)
                .fee(5000)
                .sign('e204192bcb601d79e19656ccab434e636cf8b297f995f839518a73e7253f59a2')

            console.log(tx.toObject());
            res.json(tx)

        }
        catch (e) {
            console.log(e);
        }
    }
}

module.exports = Blockchain
