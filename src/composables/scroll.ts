import { ref, reactive, onMounted, onBeforeUnmount, onUnmounted } from "vue";

type ElementList = Array<HTMLDivElement>;
interface ScrollDirectionObj {
  scrollX: StrRef;
  scrollY: StrRef;
  horizontalScroll: BoolRef;
  verticalScroll: BoolRef;
}
interface ScrollEndObj {
  scrollEnd: BoolRef;
}
export const useScrollDirection = (
  elementClassName: string
): ScrollDirectionObj => {
  let timer: Timeout;
  let timer2: Timeout;
  const touchStartX: NumRef = ref(0);
  const touchStartY: NumRef = ref(0);
  const touchEndX: NumRef = ref(0);
  const touchEndY: NumRef = ref(0);
  const scrollX: StrRef = ref("");
  const scrollY: StrRef = ref("");
  const horizontalScroll: BoolRef = ref(false);
  const verticalScroll: BoolRef = ref(false);
  let elList: ElementList = reactive([]);
  const leftScrollNum: NumRef = ref(0);
  const rightScrollNum: NumRef = ref(0);
  const upScrollNum: NumRef = ref(0);
  const downScrollNum: NumRef = ref(0);
  const handleGesture = (): void => {
    if (
      touchStartY.value - touchEndY.value < 20 &&
      touchStartY.value - touchEndY.value > -20
    ) {
      if (
        touchEndX.value < touchStartX.value
        // &&
        // touchStartX.value - touchEndX.value > 20
      ) {
        leftScrollNum.value++;
        scrollX.value = `left${leftScrollNum.value}`;
      } else if (
        touchEndX.value > touchStartX.value
        // &&
        // touchEndX.value - touchStartX.value > 20
      ) {
        rightScrollNum.value++;
        scrollX.value = `right${rightScrollNum.value}`;
      }
    }
    if (touchEndY.value < touchStartY.value) {
      upScrollNum.value++;
      scrollY.value = `up${upScrollNum.value}`;
    } else if (touchEndY.value > touchStartY.value) {
      downScrollNum.value++;
      scrollY.value = `down${downScrollNum.value}`;
    }
    if (
      touchEndX.value - touchStartX.value > 100 ||
      touchEndX.value - touchStartX.value < -100
    )
      horizontalScroll.value = true;
    else horizontalScroll.value = false;
    if (
      touchEndY.value - touchStartY.value > 200 ||
      touchEndY.value - touchStartY.value < -200
    )
      verticalScroll.value = true;
    else verticalScroll.value = false;
  };
  const touchStart = (event: TouchEvent) => {
    touchStartX.value = event.changedTouches[0].screenX;
    touchStartY.value = event.changedTouches[0].screenY;
  };
  const touchEnd = (event: TouchEvent) => {
    touchEndX.value = event.changedTouches[0].screenX;
    touchEndY.value = event.changedTouches[0].screenY;
    handleGesture();
  };
  onMounted(() => {
    timer = setTimeout(() => {
      clearTimeout(timer);
      elList = Array.from(window.document.querySelectorAll(elementClassName));
      elList.forEach((el) => {
        el.addEventListener("touchstart", touchStart);
        el.addEventListener("touchend", touchEnd);
      });
    }, 0);
  });
  onBeforeUnmount(() => {
    timer2 = setTimeout(() => {
      clearTimeout(timer2);
      elList.forEach((el) => {
        el.removeEventListener("touchstart", touchStart);
        el.removeEventListener("touchend", touchEnd);
      });
    }, 0);
  });
  onUnmounted(() => {
    clearTimeout(timer);
    clearTimeout(timer2);
  });
  return { scrollX, scrollY, horizontalScroll, verticalScroll };
};
export const useScrollEnd = (elementClassName: string): ScrollEndObj => {
  let timer: Timeout;
  let timer2: Timeout;
  const scrollEnd: BoolRef = ref(false);
  let el: HTMLDivElement | any = reactive({});
  const handleGesture = (): void => {
    scrollEnd.value = el.scrollHeight <= el.scrollTop + el.offsetHeight + 50;
  };
  onMounted(() => {
    timer = setTimeout(() => {
      clearTimeout(timer);
      el = window.document.querySelector(elementClassName);
      if (el) el.addEventListener("scroll", handleGesture);
    }, 500);
  });
  onBeforeUnmount(() => {
    timer2 = setTimeout(() => {
      clearTimeout(timer2);
      if (el) el.removeEventListener("scroll", handleGesture);
    }, 0);
  });
  onUnmounted(() => {
    clearTimeout(timer);
    clearTimeout(timer2);
  });
  return { scrollEnd };
};
