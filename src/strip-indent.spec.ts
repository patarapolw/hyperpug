import { stripIndent } from "./strip-indent";
import expect from "expect";

describe("stripIndent", () => {
    [{ text: `
    ### Update (2019-08-16)

    - Custom markdown
        - Tables and image resize with [Showdown.js](https://github.com/showdownjs/showdown), also, GitHub flavor.
        - Clone the project to use your own!
    - [Pug](https://pugjs.org) with [SCSS](https://sass-lang.com/) and custom markdown support
    - HTML conversion is now done at server-side
    `, indent: 4}].forEach((el) => {
        it("Mixed with blank no-indent line", () => {
            const output = stripIndent(el.text);
            console.log(output);
            expect(/[ \t]/.test(output[0])).toBeFalsy();
        })
    })
})