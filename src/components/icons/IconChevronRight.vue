<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    :height="height"
    :width="width"
    :fill="color"
  >
    <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
  </svg>
</template>

<script setup lang="ts">
export interface Props {
  width?: number;
  height?: number;
  color?: string;
}

withDefaults(defineProps<Props>(), {
  width: 24,
  height: 24,
  color: 'currentColor',
});
</script>
