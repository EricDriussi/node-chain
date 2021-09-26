import crypto from "crypto";
import {Transaction} from "./Transaction";
import {Chain} from "./Chain";

export class Wallet {
    public pubKey: string;
    public privKey: string;

    constructor() {
        const keyPair = crypto.generateKeyPairSync("rsa", {
            // Just some generic rsa settings
            modulusLength: 4096,
            publicKeyEncoding: {type: 'spki', format: 'pem'},
            privateKeyEncoding: {type: 'pkcs8', format: 'pem'},
        })

        this.pubKey = keyPair.publicKey;
        this.privKey = keyPair.privateKey;
    }

    get address(){
        return this.pubKey;
    }

    pay(amount: number,senderPubKey: string) {
        const transaction = new Transaction(amount, this.pubKey, senderPubKey);

				// Hashing algorithm
				const sign = crypto.createSign("SHA256");
				// Value to hash
				sign.update(transaction.toString()).end();
				// Value to sign the hash with
				const signature = sign.sign(this.privKey);

				// Attempt to add a block to the chain using the signature
        Chain.instance.addBlock(transaction, this.pubKey, signature);
    }
}


