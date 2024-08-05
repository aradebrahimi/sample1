<template>
  <div
    class="min-h-[57px] flex justify-center items-center theme-text--body-large text-twilight-800"
  >
    <div v-if="state === 'loader'" class="flex items-center">
      <vt-loader size="large" class="ml-3" />
      در حال بارگذاری ...
    </div>
    <div v-else-if="state === 'empty'" class="text-center">
      <span class="icon-empty_state font-icon-size-xlarge text-twilight-800" />
      <div>{{ type === 0 ? emptyTxt + " وجود ندارد!" : emptyTxt }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    state: {
      type: String as () => string,
      required: false,
      default: "loader",
    },
    emptyTxt: {
      type: String as () => string,
      required: false,
      default: "",
    },
    type: {
      type: Number as () => number,
      required: false,
      default: 0,
    },
  },
});
</script>
