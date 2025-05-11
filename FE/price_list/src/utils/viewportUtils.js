/**
 * Utility to handle mobile viewport height issues
 * This fixes the white space that appears when scrolling on mobile
 * as the URL bar collapses
 */

// Set the viewport height CSS variable
export const setViewportHeight = () => {
  // Get the viewport height
  const vh = window.innerHeight * 0.01;
  // Set the value in the --vh custom property
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

// Initialize viewport height handler
export const initViewportHeightFix = () => {
  // Set the height initially
  setViewportHeight();

  // Update the height on resize
  window.addEventListener("resize", setViewportHeight);

  // Update on orientation change (important for mobile)
  window.addEventListener("orientationchange", setViewportHeight);

  // Handle the first scroll issue specifically
  let hasScrolled = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!hasScrolled) {
        // Force a reflow on first scroll
        requestAnimationFrame(() => {
          setViewportHeight();
          hasScrolled = true;
        });
      }
    },
    { passive: true }
  );
};
