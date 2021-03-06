# hyperlit

`hyperlit` lets you declare your [hyperapp](https://hyperapp.dev) views in a html-like fashion, similar to JSX. Unlike JSX you don't need a build-step and babel config to do it -- it happens run-time in your browser. It's quite small – ca 0.6kb.

Here's Hyperapp's "Quickstart" example using hyperlit:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <script type="module">
            import { app } from 'https://unpkg.com/hyperapp'
            import html from 'https://unpkg.com/hyperlit'

            app({
                init: 0,
                view: state => html`
                    <main>
                        <h1>${state}</h1>
                        <button onclick=${state => state - 1}>-</button>
                        <button onclick=${state => state + 1}>+</button>
                    </main>`,
                node: document.getElementById('app')
            })
        </script>
    </head>
    <body>
        <main id="app"></main>
    </body>
</html>
```

In the following instructions I will just focus on how hyperlit replaces Hyperapp's `h` function. For actually making working apps with this, familiarity with Hyperapp is assumed.

## Getting hyperlit into your project

### Using npm

In projects where you do bundle your app up, install hyperlit using:

```sh
npm i hyperlit
```

> Note that hyperapp is a peer-dependency which you'll also need to have installed.

Once installed, you can import `hyperlit` wherever you declare views:

```js
import html from 'hyperlit'
```

### Browser modules

If you prefer not to use npm, you can use client side imports directly like this:

```js
import html from 'https://unpkg.com/hyperlit'
```


## Usage

Hyperlit replaces hyperapp's built-in `h`, allowing you to write:

```js
html`
<div class="big">
    <h1>Title</h1>
    <p class="aligned">
        Content 1 <br />
        Content 2
    </p>
</div>`
```

instead of:

```js
h('div', { class: 'big' }, [
    h('h1', {}, text('Title')),
    h('p', { class: 'aligned' }, [
        text('Content 1'),
        h('br', {}),
        text('Content 2')
    ]),
])
```

### Injecting props

If you have non-string props you want to add to your vnodes, or values kept in variables, use the `${val}` syntax to
inject them:

```js
const foo = 32
const node = html`<p class=${{ bigger: foo > 30 }}>...</p>`
```

#### Spreading props

If you have a bunch of props you want to assign, you don't have to write them out individually, you can just:

```js
const props = {class: 'bigger', id: 'a-1', key: 'a-1'}
const node = html`<p ${props}>...</p>`
```

(For compatibility with views you may have written using `htm`, the `...${props}` syntax is also supported)

### Injecting content.

```js
const name = 'Joe'
const greeting = html`<span>Hello ${name}!</span>`
```

results in `h('span', {}, [text('Hello'), text('Joe'), text('!')])`.

Content can be a string or a vnode. Content can also be an array:

```js
const names = ['Kim', 'Robin', 'Sam']
const person = name => html`<p>${name}</p>`
const list = html`
<div>
    <p>Members:</p>
    ${names.map(person)}
</div>`
```

results in `list` being equivalent to:

```js
h('div', {}, [
    h('p', {}, text('Members:')),
    h('p', {}, text('Kim')),
    h('p', {}, text('Robin')),
    h('p', {}, text('Sam')),
])
```

Since hyperapp filters out falsy children, you can conditionally render some content:

```js
const show = false
html`<p>Secret: ${show && 'I work for the CIA'}</p>`
```

### Components

Let's say you have this component:

```js
const box = (props, content) => html`
<div class=${{ fancy: true, active: props.active }}>
    <h1>${props.title}</h1>
    ${content}
</div>`
```

You could of course add it to a view in this way:

```js
const view = html`
<main>
    ${box({ active: false, title: 'My bio' }, [
        html`<p>Lorem ipsum</p>`,
        html`<p>Dolor sit amet</p>`,
    ])}
</main>`
```

But hyperlit allows you to do it this way as well:

```js
const view = html`
<main>
    <${box} active=${false} title="My bio">
        <p>Lorem ipsum</p>
        <p>Dolor sit amet</p>
    <//>
</main>`
```

> For backwards compatibility with `htm` it is also possible to close components as `</${box}>`


## Tooling

### Transform to plain function calls with Babel

This library is meant to let you write html-like views that can be rendered in the browser without any build step. Still, you might eventually perfer the parsing to be taken care of by your build-toolchain in order to get faster renders. Of course you should be able to do so! Simply add `babel-plugin-hyperlit` to your babel config. In `package.json` for example, it looks like this:

```
"babel": {
  "plugins": ["hyperlit"]
}
```

With that, babel will make sure to transform all your hyperlit views into plain function calls, so the browser doesn't have to do any parsing.

### Syntax highlighting

If you use [VS Code](https://code.visualstudio.com), install the [lit-html](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html) to get highlighting and autocompletion that works well with hyperlit.

## Credits

This project was inspired by [Jason Miller's](https://github.com/developit) [htm](https://github.com/developit/htm). I made it to have a similar solution that would work well with Hyperapp.

Thanks to [Jorge Bucaran](https://github.com/jorgebucaran) for making [Hyperapp](https://github.com/jorgebucaran/hyperapp) and for coming up with the name of this project!
