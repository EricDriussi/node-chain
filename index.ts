import {Wallet} from "./src/Wallet";
import {Chain} from "./src/Chain";

const satoshi = new Wallet();
const bob = new Wallet();
const ted = new Wallet();

satoshi.pay(50, bob.address);
bob.pay(23, ted.address);
ted.pay(5, bob.address);

console.log(Chain.instance)
