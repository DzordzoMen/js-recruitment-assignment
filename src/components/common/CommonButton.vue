<template>
  <button
    class="common-button"
    :class="{
      'common-button--block': block,
      'common-button--disabled': disabled,
    }"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
export interface Props {
  block?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  block: false,
  disabled: false,
});
</script>

<style scoped lang="scss">
.common-button {
  color: var(--color-white);
  background-color: var(--color-secondary);
  display: flex;
  flex: 0 1 auto;
  border: unset;
  border-radius: var(--radius-sm);
  padding: 12px 24px;
  width: fit-content;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all ease-in-out .26s;

  &--block {
    flex: 1 1 auto;
    width: 100%;
  }

  &--disabled {
    pointer-events: none;
    color: var(--color-app-bg);
    background-color: var(--color-disabled);
  }

  &:hover {
    opacity: 0.8;
  }
}
</style>
