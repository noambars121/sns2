export const checkAriaLabels = (element: HTMLElement): boolean => {
  const interactiveElements = element.querySelectorAll(
    'button, a, input, select, textarea, [role="button"], [role="link"]',
  );

  return Array.from(interactiveElements).every((el) => {
    return (
      el.hasAttribute("aria-label") ||
      el.hasAttribute("aria-labelledby") ||
      el.hasAttribute("title") ||
      el.textContent?.trim().length > 0
    );
  });
};

export const checkKeyboardNavigation = (element: HTMLElement): boolean => {
  const focusableElements = element.querySelectorAll(
    'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );

  return Array.from(focusableElements).every((el) => {
    return (
      window.getComputedStyle(el).display !== "none" &&
      window.getComputedStyle(el).visibility !== "hidden"
    );
  });
};

export const checkColorContrast = (fg: string, bg: string): boolean => {
  // Simple luminance calculation
  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const fgColor = hexToRgb(fg);
  const bgColor = hexToRgb(bg);

  if (!fgColor || !bgColor) return false;

  const fgLuminance = getLuminance(fgColor.r, fgColor.g, fgColor.b);
  const bgLuminance = getLuminance(bgColor.r, bgColor.g, bgColor.b);

  const ratio =
    (Math.max(fgLuminance, bgLuminance) + 0.05) /
    (Math.min(fgLuminance, bgLuminance) + 0.05);

  return ratio >= 4.5; // WCAG AA standard for normal text
};
