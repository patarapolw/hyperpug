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

:scss
  From <https://www.yellowbridge.com/chinese/listsearch.php?listID=44>

  ### Sentence quiz

  Please see [](slide:github:patarapolw/zhdiary/slides/身体1.md)

  Highlight text and press "x" inside the presentation to speak.

===
`.trim())));

console.log(pretty(new HyperPug().parse(`
.w-100.mt-3: h3.text-center 天地玄黃，宇宙洪荒。
`.trim())));
