import pug from "../src/index";
import pretty from "pretty";
import { stripIndent } from "../src/strip-indent";


describe("pug", () => {
  [
    `
    div
      div hello
      div
        div goodbye
    div good idea`,
    `
    div(class=1)
      div hello
      div
        div goodbye
    div good idea`,
    `
    div(class=x)
      div hello
      div
        div goodbye
    div good idea`,
    `
    div(:class="x")
      div hello
      div
        div goodbye
    div good idea`,
    `
    div.
      div hello
      div
        div goodbye
    div good idea`,
    `.w-100.mt-3: h3.text-center 天地玄黃，宇宙洪荒。`
  ].forEach((el) => {
    it("render", () => {
      console.log(pretty(pug.render(stripIndent(el))));
    });
  });

  [
    `
    :scss
      From <https://www.yellowbridge.com/chinese/listsearch.php?listID=44>

      ### Sentence quiz

      Please see [](slide:github:patarapolw/zhdiary/slides/身体1.md)

      Highlight text and press "x" inside the presentation to speak.`
  ].forEach((el) => {
    it("compile", () => {
      console.log(pretty(pug.compile({filters: {
        markdown(x: string){return `<!-- Markdown: ${x} -->`;},
        scss(x: string){return `<!-- SCSS: ${x} -->`;}
      }})(el)));
    })
  })
});
