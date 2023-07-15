import { template } from '@vtj/utils';
const content = `
import { <%= vueImports %> } from 'vue';
import { Context, ContextMode } from '@vtj/engine';
<%= imports %>
export interface Props {
  <%= Props %>
}

const props = withDefaults(defineProps<Props>(), { <%= propsDefault %> });

const vtj = new Context({
  mode: ContextMode.RAW, 
  dsl: { id: '<%= id %>', name: '<%= name %>' },
  attrs: { <%= importItems %> }
});

const state = reactive({
  <%= state %>
});

<%= computedValues %>

<%= methodsValues %> 

<%= injectValues %>




vtj.setup({props, state <%= injectNames %> <%= computedNames %> <%= methodsNames %>})


<%= watch %>

<%= lifeCycles %>

defineOptions({
  name: '<%= name %>'
});

defineEmits([<%= emits %>]);

defineExpose({
  vtj
});

`;

export const compiled = template(content);
