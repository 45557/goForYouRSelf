/**
 * Removes all div[role="presentation"] elements found inside any
 * div[role="tablist"] on x.com (the "For You" tab).
 */
function removeForYouTab() {
  const tablists = document.querySelectorAll('div[role="tablist"]');
  tablists.forEach((tablist) => {
    tablist
      .querySelectorAll(':scope > div[role="presentation"]')
      .forEach((el) => el.remove());
  });
}

// Run once immediately in case the tablist is already in the DOM.
removeForYouTab();

// Watch for dynamic changes (x.com is a SPA).
// Debounce to avoid running on every individual DOM mutation.
let debounceTimer;
const observer = new MutationObserver(() => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(removeForYouTab, 100);
});

observer.observe(document.body, { childList: true, subtree: true });
