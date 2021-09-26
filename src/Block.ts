import crypto from "crypto";
import {Transaction} from "./Transaction";

export class Block {

    constructor(public previousHash: string, public transaction: Transaction, public timeStamp = Date.now()) {
    }

    get hash() {
        const block = JSON.stringify(this);
        const hash = crypto.createHash("SHA256");
        hash.update(block).end();
        return hash.digest("hex");
    }
}
