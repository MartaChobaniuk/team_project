export const getScrollThreshold = () => {
  if (window.innerWidth >= 1350) {
    return { threshold: 160, thresholdButtons: 86 };
  } else if (window.innerWidth >= 907) {
    return { threshold: 133, thresholdButtons: 70 };
  } else if (window.innerWidth >= 640) {
    return { threshold: 242, thresholdButtons: 70 };
  } else {
    return { threshold: 0, thresholdButtons: 0 };
  }
};
