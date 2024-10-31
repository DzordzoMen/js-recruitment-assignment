<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :height="height"
    viewBox="0 -960 960 960"
    :width="width"
    :fill="color"
  >
    <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
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
