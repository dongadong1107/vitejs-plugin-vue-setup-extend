import type { FilterPattern, Plugin, TransformResult } from "vite";
import { createFilter } from "vite";
import { parse } from "vue/compiler-sfc";

export interface Options {
  include?: FilterPattern | undefined;
  exclude?: FilterPattern | undefined;
}

/**
 * setup script 标签功能扩展，支持在标签上定义 name 和 inheritAttrs 属性
 */
export default function vueSetupExtend(options?: Options) {
  const filter = createFilter(options?.include || "./src/**", options?.exclude);
  const plugin: Plugin = {
    name: "vitejs-plugin-vue-setup-extend",
    enforce: "pre",
    transform(content, path) {
      if (!filter(path)) return;
      if (!path.endsWith(".vue")) return;

      return transformScript(content);
    },
  };

  return plugin;
}

function transformScript(content: string): TransformResult {
  const { descriptor } = parse(content);

  if (!descriptor.script && descriptor.scriptSetup) {
    const { name, lang, inheritAttrs } = descriptor.scriptSetup.attrs;

    let option = "";
    if (name) {
      option += `  name: '${name}',`;
    }
    if (inheritAttrs) {
      option += `\n  inheritAttrs: ${inheritAttrs},`;
    }

    if (option) {
      content = `
<script ${lang ? `lang="${lang}"` : ""}>
export default {
${option}
}
</script>

${content}
`;
    }
  }

  return {
    map: null,
    code: content,
  };
}
