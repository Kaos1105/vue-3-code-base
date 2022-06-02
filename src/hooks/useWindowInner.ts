import { onMounted, ref } from 'vue';

export function useWindowInner(runOnMount = true) {
  const innerWidth = ref(0);
  const innerHeight = ref(0);
  // @ts-ignore
  onMounted(() => {
    if (runOnMount) {
      getInner();
      window.addEventListener('resize', () => getInner());
    }
  });

  const getInner = () => {
    innerWidth.value = window.innerWidth;
    innerHeight.value = window.innerHeight;
  };

  return { innerWidth, innerHeight };
}
