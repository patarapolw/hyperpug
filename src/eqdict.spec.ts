import { eqDictParser } from "./eqdict";

console.log(eqDictParser("a"));
console.log(eqDictParser("a=b"));
console.log(eqDictParser("a=b, c=d"));
console.log(eqDictParser("a=b c=d"));