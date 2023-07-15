<template>
  <div class="vtj-logo" @click="onClick">
    <img
      v-if="props.icon"
      :title="props.text"
      class="vtj-logo__icon"
      :src="props.icon" />
    <span v-else>{{ props.text }}</span>
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  icon?: string;
  text?: string;
  link?: string;
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Vtj'
});

const onClick = () => {
  if (props.link) {
    location.href = props.link;
  }
};

defineExpose({
  props
});
</script>
<style lang="scss">
@use '../../style/vars' as *;
.vtj-logo {
  font-size: 18px;
  font-weight: bold;
  color: $vtj-primary-color;
  width: 50px;
  text-align: center;
  text-shadow: 0 0 1px $vtj-border-color;
  &__icon {
    width: 24px;
    height: 24px;
    display: inline-block;
    vertical-align: bottom;
  }
}

.vtj-project-switcher {
  padding-left: 10px;
  color: $vtj-secondary-color;
  font-size: 14px;
  width: 340px;
  &__back {
    margin-right: 5px;
  }
}
</style>
