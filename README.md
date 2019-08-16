# HyperPug

[Pug](https://pugjs.org) for browser, based on [Hyperscript](https://github.com/hyperhype/hyperscript). With [Pug filters](https://pugjs.org/language/filters.html)' support.

## Usage

```typescript
new HyperPug(filters).parse(s);
```

## Example

- Input

```
div(class=x)
  div hello
  div
    div goodbye
div good idea
```

- Output

```
<div class="x">
  <div>hello</div>
  <div>
    <div>goodbye</div>
  </div>
</div>
<div>good idea</div>
```

- Input

```
div.
  div hello
  div
    div goodbye
div good idea
```

- Output

```
<div>div hello
div
  div goodbye</div>
<div>good idea</div>
```
