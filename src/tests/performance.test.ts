import { test, expect } from "vitest";
import {
  measureLoadTime,
  measureFrameRate,
  measureFirstContentfulPaint,
} from "./utils/performance";

test("page load time is under 3 seconds", async () => {
  const loadTime = await measureLoadTime();
  expect(loadTime).toBeLessThan(3000);
});

test("animations are smooth (60fps)", async () => {
  const fps = await measureFrameRate();
  expect(fps).toBeGreaterThanOrEqual(60);
});

test("First Contentful Paint is under 1.5 seconds", async () => {
  const fcp = await measureFirstContentfulPaint();
  expect(fcp).toBeLessThan(1500);
});

test("Image loading is optimized", async () => {
  const imageLoadTimes = await Promise.all(
    document.querySelectorAll("img").length > 0
      ? Array.from(document.querySelectorAll("img")).map((img) => {
          return new Promise((resolve) => {
            if (img.complete) {
              resolve(0);
            } else {
              const start = performance.now();
              img.onload = () => resolve(performance.now() - start);
            }
          });
        })
      : [Promise.resolve(0)],
  );

  const averageLoadTime =
    imageLoadTimes.reduce((a, b) => a + (b as number), 0) /
    imageLoadTimes.length;
  expect(averageLoadTime).toBeLessThan(1000);
});
