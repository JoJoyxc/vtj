// vite.config.ts
import { createViteConfig, writeVersion } from "file:///D:/vtj/vtj/packages/cli/lib/index.mjs";
var index = createViteConfig({
  debug: false,
  lib: true,
  cdn: false,
  elementPlus: false,
  emptyOutDir: false,
  external: [
    "vue",
    "prettier",
    "prettier/parser-html",
    "prettier/parser-babel",
    "prettier/parser-postcss",
    "@vtj/ui",
    "@vtj/icons",
    "@vtj/utils",
    "element-plus",
    "element-plus/lib/locale/lang/zh-CN",
    "@element-plus/icons-vue",
    "mitt",
    "zen-logger",
    "@vueuse/core",
    "monaco-editor",
    "monaco-editor/esm/vs/editor/editor.worker?worker",
    "monaco-editor/esm/vs/language/json/json.worker?worker",
    "monaco-editor/esm/vs/language/css/css.worker?worker",
    "monaco-editor/esm/vs/language/html/html.worker?worker",
    "monaco-editor/esm/vs/language/typescript/ts.worker?worker",
    "jsoneditor"
  ],
  externalGlobals: {}
});
var runtime = createViteConfig({
  debug: false,
  lib: true,
  cdn: false,
  elementPlus: false,
  emptyOutDir: true,
  dts: false,
  dtsOutputDir: null,
  entry: "src/runtime.ts",
  fileName: "runtime",
  external: [
    "vue",
    "prettier",
    "prettier/parser-html",
    "prettier/parser-babel",
    "prettier/parser-postcss",
    "@vtj/ui",
    "@vtj/icons",
    "@vtj/utils",
    "element-plus",
    "element-plus/lib/locale/lang/zh-CN",
    "@element-plus/icons-vue",
    "mitt",
    "zen-logger",
    "@vueuse/core",
    "monaco-editor",
    "monaco-editor/esm/vs/editor/editor.worker?worker",
    "monaco-editor/esm/vs/language/json/json.worker?worker",
    "monaco-editor/esm/vs/language/css/css.worker?worker",
    "monaco-editor/esm/vs/language/html/html.worker?worker",
    "monaco-editor/esm/vs/language/typescript/ts.worker?worker",
    "jsoneditor"
  ],
  externalGlobals: {}
});
var shared = createViteConfig({
  debug: false,
  lib: true,
  cdn: false,
  elementPlus: false,
  emptyOutDir: false,
  dts: false,
  dtsOutputDir: null,
  entry: "src/shared.ts",
  fileName: "shared",
  external: [
    "vue",
    "prettier",
    "prettier/parser-html",
    "prettier/parser-babel",
    "prettier/parser-postcss",
    "@vtj/ui",
    "@vtj/icons",
    "@vtj/utils",
    "element-plus/lib/locale/lang/zh-CN",
    "@element-plus/icons-vue",
    "mitt",
    "zen-logger",
    "@vueuse/core",
    "monaco-editor",
    "monaco-editor/esm/vs/editor/editor.worker?worker",
    "monaco-editor/esm/vs/language/json/json.worker?worker",
    "monaco-editor/esm/vs/language/css/css.worker?worker",
    "monaco-editor/esm/vs/language/html/html.worker?worker",
    "monaco-editor/esm/vs/language/typescript/ts.worker?worker",
    "jsoneditor"
  ],
  externalGlobals: {}
});
var map = {
  runtime,
  shared
};
writeVersion();
var vite_config_default = map[process.env.FILE] || index;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx2dGpcXFxcdnRqXFxcXHBhY2thZ2VzXFxcXGVuZ2luZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcdnRqXFxcXHZ0alxcXFxwYWNrYWdlc1xcXFxlbmdpbmVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3Z0ai92dGovcGFja2FnZXMvZW5naW5lL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgY3JlYXRlVml0ZUNvbmZpZywgd3JpdGVWZXJzaW9uIH0gZnJvbSAnQHZ0ai9jbGknO1xuXG5jb25zdCBpbmRleCA9IGNyZWF0ZVZpdGVDb25maWcoe1xuICBkZWJ1ZzogZmFsc2UsXG4gIGxpYjogdHJ1ZSxcbiAgY2RuOiBmYWxzZSxcbiAgZWxlbWVudFBsdXM6IGZhbHNlLFxuICBlbXB0eU91dERpcjogZmFsc2UsXG4gIGV4dGVybmFsOiBbXG4gICAgJ3Z1ZScsXG4gICAgJ3ByZXR0aWVyJyxcbiAgICAncHJldHRpZXIvcGFyc2VyLWh0bWwnLFxuICAgICdwcmV0dGllci9wYXJzZXItYmFiZWwnLFxuICAgICdwcmV0dGllci9wYXJzZXItcG9zdGNzcycsXG4gICAgJ0B2dGovdWknLFxuICAgICdAdnRqL2ljb25zJyxcbiAgICAnQHZ0ai91dGlscycsXG4gICAgJ2VsZW1lbnQtcGx1cycsXG4gICAgJ2VsZW1lbnQtcGx1cy9saWIvbG9jYWxlL2xhbmcvemgtQ04nLFxuICAgICdAZWxlbWVudC1wbHVzL2ljb25zLXZ1ZScsXG4gICAgJ21pdHQnLFxuICAgICd6ZW4tbG9nZ2VyJyxcbiAgICAnQHZ1ZXVzZS9jb3JlJyxcbiAgICAnbW9uYWNvLWVkaXRvcicsXG4gICAgJ21vbmFjby1lZGl0b3IvZXNtL3ZzL2VkaXRvci9lZGl0b3Iud29ya2VyP3dvcmtlcicsXG4gICAgJ21vbmFjby1lZGl0b3IvZXNtL3ZzL2xhbmd1YWdlL2pzb24vanNvbi53b3JrZXI/d29ya2VyJyxcbiAgICAnbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvY3NzL2Nzcy53b3JrZXI/d29ya2VyJyxcbiAgICAnbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvaHRtbC9odG1sLndvcmtlcj93b3JrZXInLFxuICAgICdtb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS90eXBlc2NyaXB0L3RzLndvcmtlcj93b3JrZXInLFxuICAgICdqc29uZWRpdG9yJ1xuICBdLFxuICBleHRlcm5hbEdsb2JhbHM6IHt9XG59KTtcblxuY29uc3QgcnVudGltZSA9IGNyZWF0ZVZpdGVDb25maWcoe1xuICBkZWJ1ZzogZmFsc2UsXG4gIGxpYjogdHJ1ZSxcbiAgY2RuOiBmYWxzZSxcbiAgZWxlbWVudFBsdXM6IGZhbHNlLFxuICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgZHRzOiBmYWxzZSxcbiAgZHRzT3V0cHV0RGlyOiBudWxsLFxuICBlbnRyeTogJ3NyYy9ydW50aW1lLnRzJyxcbiAgZmlsZU5hbWU6ICdydW50aW1lJyxcbiAgZXh0ZXJuYWw6IFtcbiAgICAndnVlJyxcbiAgICAncHJldHRpZXInLFxuICAgICdwcmV0dGllci9wYXJzZXItaHRtbCcsXG4gICAgJ3ByZXR0aWVyL3BhcnNlci1iYWJlbCcsXG4gICAgJ3ByZXR0aWVyL3BhcnNlci1wb3N0Y3NzJyxcbiAgICAnQHZ0ai91aScsXG4gICAgJ0B2dGovaWNvbnMnLFxuICAgICdAdnRqL3V0aWxzJyxcbiAgICAnZWxlbWVudC1wbHVzJyxcbiAgICAnZWxlbWVudC1wbHVzL2xpYi9sb2NhbGUvbGFuZy96aC1DTicsXG4gICAgJ0BlbGVtZW50LXBsdXMvaWNvbnMtdnVlJyxcbiAgICAnbWl0dCcsXG4gICAgJ3plbi1sb2dnZXInLFxuICAgICdAdnVldXNlL2NvcmUnLFxuICAgICdtb25hY28tZWRpdG9yJyxcbiAgICAnbW9uYWNvLWVkaXRvci9lc20vdnMvZWRpdG9yL2VkaXRvci53b3JrZXI/d29ya2VyJyxcbiAgICAnbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9qc29uLndvcmtlcj93b3JrZXInLFxuICAgICdtb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9jc3MvY3NzLndvcmtlcj93b3JrZXInLFxuICAgICdtb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9odG1sL2h0bWwud29ya2VyP3dvcmtlcicsXG4gICAgJ21vbmFjby1lZGl0b3IvZXNtL3ZzL2xhbmd1YWdlL3R5cGVzY3JpcHQvdHMud29ya2VyP3dvcmtlcicsXG4gICAgJ2pzb25lZGl0b3InXG4gIF0sXG4gIGV4dGVybmFsR2xvYmFsczoge31cbn0pO1xuXG5jb25zdCBzaGFyZWQgPSBjcmVhdGVWaXRlQ29uZmlnKHtcbiAgZGVidWc6IGZhbHNlLFxuICBsaWI6IHRydWUsXG4gIGNkbjogZmFsc2UsXG4gIGVsZW1lbnRQbHVzOiBmYWxzZSxcbiAgZW1wdHlPdXREaXI6IGZhbHNlLFxuICBkdHM6IGZhbHNlLFxuICBkdHNPdXRwdXREaXI6IG51bGwsXG4gIGVudHJ5OiAnc3JjL3NoYXJlZC50cycsXG4gIGZpbGVOYW1lOiAnc2hhcmVkJyxcbiAgZXh0ZXJuYWw6IFtcbiAgICAndnVlJyxcbiAgICAncHJldHRpZXInLFxuICAgICdwcmV0dGllci9wYXJzZXItaHRtbCcsXG4gICAgJ3ByZXR0aWVyL3BhcnNlci1iYWJlbCcsXG4gICAgJ3ByZXR0aWVyL3BhcnNlci1wb3N0Y3NzJyxcbiAgICAnQHZ0ai91aScsXG4gICAgJ0B2dGovaWNvbnMnLFxuICAgICdAdnRqL3V0aWxzJyxcbiAgICAnZWxlbWVudC1wbHVzL2xpYi9sb2NhbGUvbGFuZy96aC1DTicsXG4gICAgJ0BlbGVtZW50LXBsdXMvaWNvbnMtdnVlJyxcbiAgICAnbWl0dCcsXG4gICAgJ3plbi1sb2dnZXInLFxuICAgICdAdnVldXNlL2NvcmUnLFxuICAgICdtb25hY28tZWRpdG9yJyxcbiAgICAnbW9uYWNvLWVkaXRvci9lc20vdnMvZWRpdG9yL2VkaXRvci53b3JrZXI/d29ya2VyJyxcbiAgICAnbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9qc29uLndvcmtlcj93b3JrZXInLFxuICAgICdtb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9jc3MvY3NzLndvcmtlcj93b3JrZXInLFxuICAgICdtb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9odG1sL2h0bWwud29ya2VyP3dvcmtlcicsXG4gICAgJ21vbmFjby1lZGl0b3IvZXNtL3ZzL2xhbmd1YWdlL3R5cGVzY3JpcHQvdHMud29ya2VyP3dvcmtlcicsXG4gICAgJ2pzb25lZGl0b3InXG4gIF0sXG4gIGV4dGVybmFsR2xvYmFsczoge31cbn0pO1xuXG5jb25zdCBtYXAgPSB7XG4gIHJ1bnRpbWUsXG4gIHNoYXJlZFxufTtcblxud3JpdGVWZXJzaW9uKCk7XG5cbmV4cG9ydCBkZWZhdWx0IG1hcFtwcm9jZXNzLmVudi5GSUxFXSB8fCBpbmRleDtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFEsU0FBUyxrQkFBa0Isb0JBQW9CO0FBRXpULElBQU0sUUFBUSxpQkFBaUI7QUFBQSxFQUM3QixPQUFPO0FBQUEsRUFDUCxLQUFLO0FBQUEsRUFDTCxLQUFLO0FBQUEsRUFDTCxhQUFhO0FBQUEsRUFDYixhQUFhO0FBQUEsRUFDYixVQUFVO0FBQUEsSUFDUjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUFBLEVBQ0EsaUJBQWlCLENBQUM7QUFDcEIsQ0FBQztBQUVELElBQU0sVUFBVSxpQkFBaUI7QUFBQSxFQUMvQixPQUFPO0FBQUEsRUFDUCxLQUFLO0FBQUEsRUFDTCxLQUFLO0FBQUEsRUFDTCxhQUFhO0FBQUEsRUFDYixhQUFhO0FBQUEsRUFDYixLQUFLO0FBQUEsRUFDTCxjQUFjO0FBQUEsRUFDZCxPQUFPO0FBQUEsRUFDUCxVQUFVO0FBQUEsRUFDVixVQUFVO0FBQUEsSUFDUjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUFBLEVBQ0EsaUJBQWlCLENBQUM7QUFDcEIsQ0FBQztBQUVELElBQU0sU0FBUyxpQkFBaUI7QUFBQSxFQUM5QixPQUFPO0FBQUEsRUFDUCxLQUFLO0FBQUEsRUFDTCxLQUFLO0FBQUEsRUFDTCxhQUFhO0FBQUEsRUFDYixhQUFhO0FBQUEsRUFDYixLQUFLO0FBQUEsRUFDTCxjQUFjO0FBQUEsRUFDZCxPQUFPO0FBQUEsRUFDUCxVQUFVO0FBQUEsRUFDVixVQUFVO0FBQUEsSUFDUjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxpQkFBaUIsQ0FBQztBQUNwQixDQUFDO0FBRUQsSUFBTSxNQUFNO0FBQUEsRUFDVjtBQUFBLEVBQ0E7QUFDRjtBQUVBLGFBQWE7QUFFYixJQUFPLHNCQUFRLElBQUksUUFBUSxJQUFJLElBQUksS0FBSzsiLAogICJuYW1lcyI6IFtdCn0K
