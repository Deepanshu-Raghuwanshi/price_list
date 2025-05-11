/**
 * Utility to handle mobile viewport issues with URL bar
 */

// We don't need these functions anymore

// Initialize viewport height handler
export const initViewportHeightFix = () => {
  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    // Force a small scroll to normalize the URL bar state
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 100);

    // Handle orientation changes
    window.addEventListener(
      "orientationchange",
      () => {
        // Force a small scroll after orientation change
        setTimeout(() => {
          window.scrollTo(0, 1);
        }, 100);
      },
      { passive: true }
    );

    // Handle resize events
    window.addEventListener(
      "resize",
      () => {
        // Force a small scroll to normalize the URL bar state
        setTimeout(() => {
          window.scrollTo(0, 1);
        }, 100);
      },
      { passive: true }
    );
  }
};
