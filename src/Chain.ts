import {Block} from "./Block";
import {Transaction} from "./Transaction";
import crypto from "crypto";

export class Chain {
    public static instance = new Chain();
    chain: Block[];

    constructor() {
        this.chain = [new Block("", new Transaction(10, "God", "Satoshi"))];
    }

    get lastBlock() {
        return this.chain[this.chain.length - 1];
    }

		addBlock(transaction: Transaction, senderPubKey: string, signature: Buffer) {
				const verifier = crypto.createVerify("SHA256");
				verifier.update(transaction.toString());
				const transactionIsValid = verifier.verify(senderPubKey, signature)

				if (transactionIsValid) {
						// Create the block
						const newBlock = new Block(this.lastBlock.hash, transaction);
						// Proof of work!
						this.mine(newBlock.proofOfWorkSeed);
						// Add it to the chain
						this.chain.push(newBlock);
				}
		}

		mine(proofOfWorkSeed: number) {
				let solution = 1;
				console.log("⛏️ ... ⛏️ ... ⛏️");

				while (true) {

						const hash = crypto.createHash("MD5");
						hash.update((proofOfWorkSeed + solution).toString()).end();

						const attempt = hash.digest("hex");

						if (attempt.substr(0, 4) === "9999") {
								console.log(`Done! Solution: ${solution}`)
								return solution;
						}

						solution += 1;
				}
		}
}
