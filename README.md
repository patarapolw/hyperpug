# HyperPug

[![npm version](https://badge.fury.io/js/hyperpug.svg)](https://badge.fury.io/js/hyperpug)

Pug for browser/Electron, based on Hyperscript. With Pug filters' support.

## Usage

```typescript
import HyperPug from 'hyperpug'
const hp = new HyperPug()

console.log(hp.parse(HYPERPUG_STRING))
```

## Usage with filters

```typescript
import HyperPug from 'hyperpug'
const hp = new HyperPug({
  hidden: (s) => {
    return `<!-- ${JSON.stringify(s)} -->`
  }
})

console.log(hp.parse(HYPERPUG_STRING))
```

## Usage on the browser

```html
<div id="hyperpug"></div>
<script src="https://unpkg.com/hyperpug@:version"></script>
<script>
const hp = new HyperPug({
  hidden: (s) => {
    return `<!-- ${JSON.stringify(s)} -->`
  }
})

document.getElementById("hyperpug").innerHTML = hp.parse(`
  div(class="x")
    div hello
    div
      div goodbye
  div good idea
`)
</script>
```
