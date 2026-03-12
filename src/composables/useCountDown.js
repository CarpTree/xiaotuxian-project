import { ref, computed, onUnmounted } from "vue";
import dayjs from "dayjs";

export const useCountDown = () => {
  let timer = null;
  const time = ref(0);
  //格式化的computed属性
  const formatTime = computed(() => dayjs.unix(time.value).format("mm分ss秒"));
  //倒计时
  const start = (curTime) => {
    time.value = curTime;
    timer = setInterval(() => {
      time.value--;
    }, 1000);
  };
  //清除
  onUnmounted(() => {
    timer && clearInterval(timer);
  });
  return {
    formatTime,
    start,
  };
};
