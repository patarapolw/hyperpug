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
