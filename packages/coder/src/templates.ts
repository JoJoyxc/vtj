import { template } from '@vtj/base';

const scriptTemplate = `
<%= imports %>
import { useProvider } from '@vtj/web';
export default defineComponent({
  name: '<%= name %>', 
  <% if(inject) { %> inject: { <%= inject %>}, <% } %>
  <% if(components) { %> components: { <%= components %> }, <% } %>
  <% if(props) { %> props: { <%= props %> }, <% } %>
  <% if(emits) {%> emits: [<%= emits %>], <% } %> 
  setup(props) {
    const provider = useProvider();
    const state = reactive({ <%= state %> });
    return {
      state,
      props,
      provider
      <% if(returns) { %>, <%= returns %> <% } %>
    };
  },
  <% if(computed) { %> computed: { <%= computed %> }, <% } %>
  <% if(methods) { %> methods: { <%= methods %> }, <% } %>
  <% if(watch) { %> watch: { <%= watch %> }, <% } %> <%= lifeCycles %>
});
`;

const vueTemplate = `
<template>
  <%= template %>
</template>
<script lang="ts">
  <%= template %>
</script>
<style lang="scss" scoped>
  <%= css %>
</style>
`;

export const scriptCompiled = template(scriptTemplate);
export const vueCompiled = template(vueTemplate);
