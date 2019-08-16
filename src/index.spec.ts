import { HyperPug } from "./index";
import h from "hyperscript"
import pretty from "pretty";

console.log(pretty(h("div", new HyperPug().compile(`
div
  div hello
  div
    div goodbye
div good idea
`.trim())).innerHTML));

console.log(pretty(h("div", new HyperPug().compile(`
div(class=1)
  div hello
  div
    div goodbye
div good idea
`.trim())).innerHTML));

console.log(pretty(h("div", new HyperPug().compile(`
div(class=x)
  div hello
  div
    div goodbye
div good idea
`.trim())).innerHTML));

console.log(pretty(h("div", new HyperPug().compile(`
div(:class="x")
  div hello
  div
    div goodbye
div good idea
`.trim())).innerHTML));

console.log(pretty(h("div", new HyperPug().compile(`
div.
  div hello
  div
    div goodbye
div good idea
`.trim())).innerHTML));
