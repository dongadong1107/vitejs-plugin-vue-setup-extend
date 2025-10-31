# vitejs-plugin-vue-setup-extend

[![npm](https://img.shields.io/npm/v/vitejs-plugin-vue-setup-extend.svg)](https://www.npmjs.com/package/vitejs-plugin-vue-setup-extend)
[![npm](https://img.shields.io/npm/dm/vitejs-plugin-vue-setup-extend.svg)](https://www.npmjs.com/package/vitejs-plugin-vue-setup-extend)

Vue 3 `<script setup>` syntax extension that supports defining component `name` and `inheritAttrs` properties.

[English](./README_en.md) | [中文](./README.md)

## Difference from other plugins

Compared to [`vite-plugin-vue-setup-extend`](https://github.com/vbenjs/vite-plugin-vue-setup-extend) and [`vite-plugin-vue-setup-extend-plus`](https://github.com/chenxch/vite-plugin-vue-setup-extend-plus), this plugin specifically solves a common problem when using TypeScript:

When component Props types are defined in separate files and imported using import, other plugins may encounter compilation errors. This plugin avoids this issue.

## Installation

```bash
npm install vitejs-plugin-vue-setup-extend -D
# or
yarn add vitejs-plugin-vue-setup-extend -D
# or
pnpm add vitejs-plugin-vue-setup-extend -D
```

## Usage

### Configure the plugin

Add the plugin in `vite.config.js`:

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueSetupExtend from "vitejs-plugin-vue-setup-extend";

export default defineConfig({
  plugins: [vue(), vueSetupExtend()],
});
```

### Use in components

```ts
// type.ts
export interface Props {
  param1: string;
  param2: number;
}
```

```vue
<template>
  <div>{{ param1 }}: {{ param2 }}</div>
</template>

<script setup lang="ts" name="MyComponent" inheritAttrs="false">
import type { Props } from "./type";
import { ref } from "vue";

defineProps<Props>();

const data = ref("MyComponent");
</script>
```

The plugin will automatically transform the above Vue code to:

```vue
<script lang="ts">
export default {
  name: "MyComponent",
  inheritAttrs: false,
};
</script>

<template>
  <div>{{ param1 }}: {{ param2 }}</div>
</template>

<script setup lang="ts" name="MyComponent" inheritAttrs="false">
import type { Props } from "./type";
import { ref } from "vue";

defineProps<Props>();

const data = ref("MyComponent");
</script>
```

### Configuration options

The plugin supports the following configuration options:

```js
vueSetupExtend({
  include: ["./src/**"], // Included file patterns, defaults to ["./src/**"]
  exclude: [], // Excluded file patterns
});
```
