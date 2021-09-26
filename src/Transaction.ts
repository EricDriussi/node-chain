export class Transaction {
    constructor(public amount: number, public senderPubKey: string, public recieverPubKey: string) {
    }

    toString() {
        return JSON.stringify(this);
    }
}
