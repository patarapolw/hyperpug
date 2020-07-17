# HyperPug

[![npm version](https://badge.fury.io/js/hyperpug.svg)](https://badge.fury.io/js/hyperpug) [![Website shields.io](https://img.shields.io/website-up-down-green-red/https/hyperpug.netlify.app.svg)](https://hyperpug.netlify.app/)

Lighter Pug for browser/Electron. With Pug filters' support.

## Usage

```typescript
import HyperPug from 'hyperpug'
const hp = new HyperPug()

console.log(hp.parse(HYPERPUG_STRING))
```

## Usage with filters

Filters are normalized for Markdown and other indented languages are well.

```typescript
import HyperPug from 'hyperpug'
const hp = new HyperPug({
  markdown: (s) => {
    return markdownMaker(s)
  }
})

console.log(hp.parse(HYPERPUG_STRING))
```

## Usage on the browser

```html
<div id="hyperpug"></div>
<script src="https://unpkg.com/hyperpug"></script>
<script>
const hp = new HyperPug({
  markdown: (s) => {
    return markdownMaker(s)
  }
})

document.getElementById("hyperpug").innerHTML = hp.parse(`
style.
  .red {
    color: red;
  }

  section {
    margin-bottom: 1rem;
  }

section(class="x")
  div hello
  blockquote
    .red goodbye
  :markdown
    # This is some heading

small Yes, this is a good idea.
`)
</script>
```
