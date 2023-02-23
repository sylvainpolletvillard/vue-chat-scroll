# vue3-chat-scroll

This is a fork of [vue-chat-scroll](https://github.com/theomessin/vue-chat-scroll) to make it compatible with Vue 3

## Installing

### Using a package manager (recommended)

The recommended way of installing _vue-chat-scroll_ is using the [npm package](https://www.npmjs.com/package/vue3-chat-scroll) with the npm package manager:

```bash
npm i vue3-chat-scroll
```

After installing the package, you must use the _vue-chat-scroll_ [plugin](https://vuejs.org/guide/reusability/plugins.html) :

```js

import VueChatScroll from 'vue3-chat-scroll';

app.use(VueChatScroll);
```

### Using a script tag

If working on a proof of concept or a fiddle, it can be easier to use a script tag. We recommend using a CDN such as unpkg or jsdelvr.

```html
<script src="https://unpkg.com/vue3-chat-scroll/dist/vue-chat-scroll.js"></script>
```

## Usage

We aim to make using _vue-chat-scroll_ as straightforward as possible. Simply using the `v-chat-scroll` directive should take care of most use cases.

```html
<div v-chat-scroll>
  ...
</div>
```

You may configure the directive by passing an object as well. For example, the `enable` configuration flag:

```html
<div v-chat-scroll="{ enable: false }">
  ...
</div>
```

Please refer to the `Config` interface and `defaultConfig` object in [config.ts](src/config.ts) to find out more about what can be configured, as well as what the default configuration values are.