import { eqDictParser } from "./eqdict";

console.log(eqDictParser("a"));
console.log(eqDictParser("a=b"));
console.log(eqDictParser("a=b, c=d"));
console.log(eqDictParser("a=b c=d"));
console.log(eqDictParser('src="https://upload.wikimedia.org/wikipedia/commons/a/ab/天-order.gif" height=100'));