import {Block} from "./Block";
import {Transaction} from "./Transaction";

export class Chain {
    public static instance = new Chain();
    chain: Block[];

    constructor() {
        this.chain = [new Block("", new Transaction(10, "God", "Satoshi"))];
    }

    get lastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(transaction: Transaction) {
				const newBlock = new Block(this.lastBlock.hash, transaction);
				this.chain.push(newBlock);
    }
}
