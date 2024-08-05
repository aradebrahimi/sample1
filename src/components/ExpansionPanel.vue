<template>
  <div class="expansion-panel">
    <div
      class="header cursor-pointer flex justify-between items-start prevent-blue-bg"
      @click="itemClicked"
      :class="[selectedEl.chevron === 'up' ? 'mb-2' : '']"
    >
      <div v-if="$slots['header']" class="ml-4">
        <slot name="header" />
      </div>
      <span
        :class="['arrow-' + expPanelKey]"
        class="text-twilight-800 font-icon-size-medium icon-chevron_down chevron"
      />
    </div>
    <div
      v-if="$slots['content']"
      class="content whitespace-pre-line max-h-0 overflow-hidden"
      :class="['item-' + expPanelKey]"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, Ref, ref } from "vue";

export default defineComponent({
  props: {
    expPanelKey: {
      type: String as () => string,
      required: false,
      default: "0",
    },
    openByDefault: {
      type: Boolean as () => boolean,
      required: false,
      default: false,
    },
  },
  setup(props) {
    interface SelectedEl {
      chevron: string;
    }

    const el: Ref<HTMLDivElement | null> = ref(null);
    const arrow: Ref<HTMLSpanElement | null> = ref(null);
    const selectedEl: SelectedEl = reactive({ chevron: "down" });
    const itemClicked = (): void => {
      selectedEl.chevron = selectedEl?.chevron === "up" ? "down" : "up";
      if (arrow.value)
        arrow.value.style.transform =
          arrow.value.style.transform === "rotate(180deg)"
            ? "rotate(0deg)"
            : "rotate(180deg)";
      if (el.value)
        el.value.style.maxHeight = el.value.style.maxHeight
          ? ""
          : el.value.scrollHeight + "px";
    };

    onMounted(() => {
      el.value = window?.document?.querySelector(`.item-${props?.expPanelKey}`);
      arrow.value = window?.document?.querySelector(
        `.arrow-${props?.expPanelKey}`
      );
      if (props?.openByDefault) {
        if (el.value) el.value.style.maxHeight = el.value?.scrollHeight + "px";
        if (arrow.value) arrow.value.style.transform = "rotate(180deg)";
        selectedEl.chevron = "up";
      }
    });

    return { itemClicked, selectedEl };
  },
});
</script>

<style scoped lang="scss">
.font-icon-size-medium {
  transition: transform 0.2s ease-out;
}
.content {
  transition: max-height 0.2s ease-out;
}
</style>
