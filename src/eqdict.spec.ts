import { eqDictParser } from "./eqdict";

describe("eqDict", () => {
  [
    "a",
    "a=b",
    "a=b, c=d",
    "a=b c=d",
    'src="https://upload.wikimedia.org/wikipedia/commons/a/ab/天-order.gif" height=100'
  ].forEach((el) => {
    it("eqDictParser", () => {
      console.log(eqDictParser(el))
;    })
  })
})
