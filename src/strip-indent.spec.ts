import { stripIndent } from "./strip-indent";

console.log(stripIndent(`
    ### Update (2019-08-16)

    - Custom markdown
        - Tables and image resize with [Showdown.js](https://github.com/showdownjs/showdown), also, GitHub flavor.
        - Clone the project to use your own!
    - [Pug](https://pugjs.org) with [SCSS](https://sass-lang.com/) and custom markdown support
    - HTML conversion is now done at server-side
`))