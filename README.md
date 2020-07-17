# HyperPug

[![npm version](https://badge.fury.io/js/hyperpug.svg)](https://badge.fury.io/js/hyperpug)

Lighter Pug for browser/Electron. With Pug filters' support.

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
  cool: (s) => {
    return `<strong>${s}</strong>`
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
  cool: (s) => {
    return `<strong>${s}</strong>`
  }
})

document.getElementById("hyperpug").innerHTML = hp.parse(`
  div(class="x")
    div hello
    div
      div goodbye
    :cool
      some cool text
  div good idea
`)
</script>
```
