/**
 * Utility to handle mobile viewport height issues
 * This fixes the white space that appears when scrolling on mobile
 * as the URL bar collapses
 *
 * Based on Chrome 56+ behavior where:
 * - vh units use the largest possible viewport (URL bar hidden)
 * - ICB uses the smallest possible viewport (URL bar shown)
 * - position:fixed elements resize with the URL bar
 */

// Initialize viewport height handler
export const initViewportHeightFix = () => {
  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
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
  }
};
