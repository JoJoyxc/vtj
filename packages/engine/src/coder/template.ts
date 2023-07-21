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

export const compiled = template(blockTsContent);
