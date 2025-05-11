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
  // Apply the height directly to body
  document.body.style.height = `calc(var(--vh, 1vh) * 100)`;
};

// Create a background extension to prevent white space
export const createBackgroundExtension = () => {
  // Create an invisible fixed element to prevent white space
  const fixedElement = document.createElement("div");
  fixedElement.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 300px;
    background-color: transparent; /* Completely transparent */
    pointer-events: none;
    z-index: 9999;
  `;
  document.body.appendChild(fixedElement);
};

// Initialize viewport height handler
export const initViewportHeightFix = () => {
  // Set the height initially
  setViewportHeight();

  // Create background extension
  createBackgroundExtension();

  // Force a small scroll to normalize the URL bar state
  setTimeout(() => {
    window.scrollTo(0, 1);
    setTimeout(setViewportHeight, 50);
  }, 100);

  // Update the height on resize
  window.addEventListener("resize", setViewportHeight, { passive: true });

  // Update on orientation change (important for mobile)
  window.addEventListener(
    "orientationchange",
    () => {
      // Delay to ensure correct height after orientation change
      setTimeout(() => {
        window.scrollTo(0, 1);
        setTimeout(setViewportHeight, 50);
      }, 100);
    },
    { passive: true }
  );

  // Handle the first scroll issue specifically
  let hasScrolled = false;
  let scrollTimer = null;

  window.addEventListener(
    "scroll",
    () => {
      // Clear any existing timer
      clearTimeout(scrollTimer);

      if (!hasScrolled) {
        // Update vh property immediately on first scroll
        setViewportHeight();
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
