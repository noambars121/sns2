export const measureLoadTime = async (): Promise<number> => {
  const start = performance.now();

  // Wait for all resources to load
  await new Promise((resolve) => {
    if (document.readyState === "complete") {
      resolve(undefined);
    } else {
      window.addEventListener("load", () => resolve(undefined));
    }
  });

  const end = performance.now();
  return end - start;
};

export const measureFrameRate = async (): Promise<number> => {
  return new Promise((resolve) => {
    let frames = 0;
    let lastTime = performance.now();

    function countFrame() {
      frames++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        resolve(frames);
      } else {
        requestAnimationFrame(countFrame);
      }
    }

    requestAnimationFrame(countFrame);
  });
};

export const measureFirstContentfulPaint = (): Promise<number> => {
  return new Promise((resolve) => {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      resolve(entries[0].startTime);
    }).observe({ entryTypes: ["paint"] });
  });
};
