<template>
  <div
    class="common-carousel__container"
    :class="{ 'common-carousel__container--expanded': expanded }"
  >
    <div
      class="common-carousel__arrow"
      :class="{
        'common-carousel__arrow--disabled': !showLeftArrow
      }"
      @click="scrollLeft"
    >
      <IconChevronLeft />
    </div>

    <div
      ref="slider"
      class="common-carousel__slider"
    >
      <slot />
    </div>

    <div
      class="common-carousel__arrow common-carousel__arrow--right"
      :class="{
        'common-carousel__arrow--disabled': !showRightArrow
      }"
      @click="scrollRight"
    >
      <IconChevronRight />
    </div>

    <div
      v-if="showExpandedActions"
      class="common-carousel__expand-actions"
      @click="expanded = !expanded"
    >
      {{ expanded ? 'Less' : 'See more hours' }}

      <IconChevronLeft />
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue';

import IconChevronRight from '../icons/IconChevronRight.vue';
import IconChevronLeft from '../icons/IconChevronLeft.vue';

const showLeftArrow = ref(false);

const showRightArrow = ref(true);

const slider = ref<HTMLDivElement | null>(null);

const expanded = ref(true);

const showExpandedActions = ref(true);

onMounted(() => {
  const sliderEl = slider.value;

  if (sliderEl) {
    sliderEl.addEventListener('scroll', scrollHandler);

    expanded.value = sliderEl.clientHeight <= 500;
    showExpandedActions.value = sliderEl.clientHeight > 500;
  }
});

onUnmounted(() => {
  const sliderEl = slider.value!;

  sliderEl.removeEventListener('click', scrollHandler);
});

function scrollHandler() {
  const sliderEl = slider.value!;
  const { scrollLeft, scrollWidth, clientWidth } = sliderEl;
  const maxScrollLeft = scrollWidth - clientWidth;

  showLeftArrow.value = scrollLeft > 0;
  showRightArrow.value = maxScrollLeft > scrollLeft;
}

function scrollSlider(left: number) {
  const sliderEl = slider.value!;
  sliderEl.scrollTo({ left, top: 0, behavior: 'smooth' });

  nextTick(() => {
    scrollHandler();
  });
}

function scrollLeft() {
  const sliderEl = slider.value!;
  const { scrollLeft, clientWidth } = sliderEl;

  const newLeft = Math.max(0, scrollLeft - (clientWidth - 50));
  scrollSlider(newLeft);
}

function scrollRight() {
  const sliderEl = slider.value!;
  const { scrollLeft, scrollWidth, clientWidth } = sliderEl;
  const maxScrollLeft = scrollWidth - clientWidth;

  const newLeft = Math.min(maxScrollLeft, scrollLeft + (clientWidth - 50));
  scrollSlider(newLeft);
}
</script>

<style scoped lang="scss">
.common-carousel {
  &__container {
    width: 100%;
    max-width: 1024px;
    margin-inline: auto;
    position: relative;
    background-color: #fff;
    border-radius: var(--radius-md);
    padding: 30px 64px 0;
    max-height: 500px;
    overflow-y: hidden;
    transition: max-height ease-in-out 0.26s;

    &--expanded {
      max-height: unset;
      overflow-y: unset;

      & > .common-carousel__slider {
        height: unset;
        padding-bottom: 12px;
      }

      & > .common-carousel__expand-actions > svg {
        transform: rotate(90deg);
      }
    }
  }

  &__slider {
    gap: 36px;
    width: 100%;
    height: 410px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    overscroll-behavior-x: contain;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: transparent;
      border: none;
    }
  }

  &__arrow {
    border-radius: 50%;
    position: absolute;
    background-color: #eef4fd;
    display: flex;
    width: 36px;
    height: 36px;
    align-items: center;
    justify-content: center;
    top: 32px;
    left: 12px;
    color: var(--color-secondary);
    cursor: pointer;
    transition: background-color ease-in-out 0.26s;

    &--right {
      right: 12px;
      left: unset;
    }

    &--disabled {
      cursor: not-allowed;
      pointer-events: none;
      color: var(--color-disabled);
      background-color: var(--color-app-bg);
      transition: unset;
    }

    &:hover {
      background-color: var(--color-secondary-hover);
    }
  }

  &__expand-actions {
    top: unset;
    inset: 0;
    width: 100%;
    cursor: pointer;
    color: var(--color-secondary);
    padding: 12px 0 24px;
    border-top: 1px solid #edeff2;
    font-size: 1rem;
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: center;

    & > svg {
      transform: rotate(-90deg);
    }
  }
}
</style>