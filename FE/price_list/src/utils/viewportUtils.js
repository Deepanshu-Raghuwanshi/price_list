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

// Create a background extension to prevent white space
export const createBackgroundExtension = () => {
  // Don't create the extension as it blocks the background image
};

// Fix for background image shifting during scroll
export const fixBackgroundShift = () => {
  // Apply to terms-container if it exists
  const termsContainer = document.querySelector(".terms-container");
  if (termsContainer) {
    // Don't set background color to allow image to show
    // Don't apply transforms that might interfere with scrolling
  }
};

// Initialize viewport height handler
export const initViewportHeightFix = () => {
  // Set the height initially
  setViewportHeight();

  // Create background extension
  createBackgroundExtension();

  // Fix background shift
  fixBackgroundShift();

  // Update the height on resize
  window.addEventListener("resize", setViewportHeight);

  // Update on orientation change (important for mobile)
  window.addEventListener("orientationchange", setViewportHeight);

  // Handle the first scroll issue specifically
  let hasScrolled = false;
  let scrollTimer = null;

  window.addEventListener(
    "scroll",
    () => {
      // Clear any existing timer
      clearTimeout(scrollTimer);

      if (!hasScrolled) {
        // Just mark as scrolled without changing background color
        hasScrolled = true;
      }

      // Set a timer to update after scrolling stops
      scrollTimer = setTimeout(() => {
        setViewportHeight();
      }, 100);
    },
    { passive: true }
  );
};
