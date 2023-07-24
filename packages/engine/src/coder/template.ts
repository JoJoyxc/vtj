import { template } from '@vtj/utils';

const blockTsContent = `
<%= imports %>

export default defineComponent({
  name: '<%= name %>',
  inject: {
    <%= inject %>
  },
  components: {
    <%= components %>
  },
  props: {
    <%= props %>
  },
  emits: [<%= emits %>],
  expose: [<%= expose %>],
  setup(props) {
    const instance = getCurrentInstance();
    const state = reactive({ <%= state %> });
    return {
      state,
      props,
      vtj: instance?.proxy as ComponentPublicInstance
    };
  },
  computed: {
    <%= computed %>
  },
  watch: {
    <%= watch %>
  },
  methods: {
    <%= methods %>
  }
  <%= lifeCycles %>
});
`;

const apiTsContent = `
import { createApi } from '@vtj/utils';

<% items.forEach(function(item, index) { %>

// <%= item.title %> 
export const <%= item.name %> = createApi({
  url: '<%= item.url %>',
  method: '<%= item.method %>',
  settings: <%= item.settings.value %>
});

<% }) %>

`;

export const compiled = template(blockTsContent);

export const apiCompiled = template(apiTsContent);
