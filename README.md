# vitejs-plugin-vue-setup-extend

[![npm](https://img.shields.io/npm/v/vitejs-plugin-vue-setup-extend.svg)](https://www.npmjs.com/package/vitejs-plugin-vue-setup-extend)
[![npm](https://img.shields.io/npm/dm/vitejs-plugin-vue-setup-extend.svg)](https://www.npmjs.com/package/vitejs-plugin-vue-setup-extend)

为 Vue 3 `<script setup>` 语法扩展支持定义组件的 `name` 和 `inheritAttrs` 属性。

[中文](./README.md) | [English](./README_en.md)

## 与其他插件的区别

相较于 [`vite-plugin-vue-setup-extend`](https://github.com/vbenjs/vite-plugin-vue-setup-extend) 和 [`vite-plugin-vue-setup-extend-plus`](https://github.com/chenxch/vite-plugin-vue-setup-extend-plus)，本插件专门解决了在使用 TypeScript 时的一个常见问题：

当组件的 Props 类型定义在单独的文件中并使用 import 引入时，其他插件可能会出现编译错误。本插件则是避免了这一问题。

## 安装

```bash
npm install vitejs-plugin-vue-setup-extend -D
# or
yarn add vitejs-plugin-vue-setup-extend -D
# or
pnpm add vitejs-plugin-vue-setup-extend -D
```

## 使用

### 配置插件

在 `vite.config.js` 中添加插件：

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueSetupExtend from "vitejs-plugin-vue-setup-extend";

export default defineConfig({
  plugins: [vue(), vueSetupExtend()],
});
```

### 在组件中使用

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

插件会自动将上述 vue 代码转换为：

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

### 配置选项

插件支持以下配置选项：

```js
vueSetupExtend({
  include: ["./src/**"], // 包含的文件模式，默认为 ["./src/**"]
  exclude: [], // 排除的文件模式
});
```