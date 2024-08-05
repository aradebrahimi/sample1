<template>
  <div v-if="$slots.body && showBottomSheetCon" class="bottom-sheet-con">
    <div
      class="pos-fixed-full z-[1] bg-_alpha-40"
      @click="closeBottomSheet('')"
    />
    <transition name="slide-up" mode="out-in">
      <div
        v-if="showBottomSheet"
        class="bottom-sheet fixed left-0 right-0 bottom-0 max-h-[100vh] overflow-x-hidden overflow-y-auto bg-twilight-050 z-[2]"
      >
        <div
          v-if="title"
          class="flex justify-center items-center p-4 theme-text--body-large relative"
        >
          {{ title }}
          <div
            class="absolute top-0 bottom-0 right-0 left-0 flex items-center justify-end p-4"
          >
            <span
              class="icon-close font-icon-size-small"
              @click="closeBottomSheet('force')"
            />
          </div>
        </div>
        <slot name="body" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onBeforeUnmount } from "vue";

export default defineComponent({
  props: {
    status: {
      type: Boolean as () => boolean,
      required: true,
      default: false,
    },
    persist: {
      type: Boolean as () => boolean,
      required: false,
      default: false,
    },
    title: {
      type: String as () => string,
      required: false,
      default: "",
    },
  },
  setup(props, ctx) {
    const showBottomSheetCon: BoolRef = ref(false);
    const showBottomSheet: BoolRef = ref(false);
    let timer: Timeout, timer2: Timeout;

    watch(
      () => props.status,
      (val) => {
        if (val) {
          showBottomSheetCon.value = val;
          timer = setTimeout(() => {
            showBottomSheet.value = val;
          }, 0);
        } else {
          showBottomSheet.value = val;
          timer2 = setTimeout(() => {
            showBottomSheetCon.value = val;
          }, 300);
        }
      }
    );

    const closeBottomSheet = (payload: "force" | "") => {
      if (!props.persist || payload === "force")
        ctx.emit("closeBottomSheet", false);
    };

    onBeforeUnmount(() => {
      clearTimeout(timer);
      clearTimeout(timer2);
    });

    return { showBottomSheetCon, closeBottomSheet, showBottomSheet };
  },
});
</script>

<style lang="scss" scoped>
.bottom-sheet-con {
  .bottom-sheet {
    border-radius: $curve_radius_16 $curve_radius_16 0 0;
  }
  .slide-up-enter-from,
  .slide-up-leave-to {
    transform: translateY(100vh);
  }
  .slide-up-enter-to,
  .slide-up-leave-from {
    transform: translateY(0);
  }
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: transform 0.3s ease-out;
  }
}
</style>
