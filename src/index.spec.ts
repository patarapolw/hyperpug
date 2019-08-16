import HyperPug from "./index";
import pretty from "pretty";

console.log(pretty(new HyperPug().parse(`
div
  div hello
  div
    div goodbye
div good idea
`.trim())));

console.log(pretty(new HyperPug().parse(`
div(class=1)
  div hello
  div
    div goodbye
div good idea
`.trim())));

console.log(pretty(new HyperPug().parse(`
div(class=x)
  div hello
  div
    div goodbye
div good idea
`.trim())));

console.log(pretty(new HyperPug().parse(`
div(:class="x")
  div hello
  div
    div goodbye
div good idea
`.trim())));

console.log(pretty(new HyperPug().parse(`
div.
  div hello
  div
    div goodbye
div good idea
`.trim())));

console.log(pretty(new HyperPug({
  markdown(x: string){return x;},
  scss(x: string){return `<!-- ${x} -->`;}
}).parse(`
:markdown
    ### Update (2019-08-16)

    - Custom markdown
        - Tables and image resize with [Showdown.js](https://github.com/showdownjs/showdown), also, GitHub flavor.
        - Clone the project to use your own!
    - [Pug](https://pugjs.org) with [SCSS](https://sass-lang.com/) and custom markdown support
    - HTML conversion is now done at server-side
:scss
    li li {
        font-size: 0.8em;
    }
`.trim())));
