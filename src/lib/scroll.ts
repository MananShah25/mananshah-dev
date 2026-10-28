// Smooth scroll to the top of the page (instant for visitors who prefer reduced motion),
// and drop any #section from the URL so a refresh doesn't jump back down.
export function scrollToTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  if (window.location.hash) {
    history.replaceState(history.state, "", window.location.pathname + window.location.search);
  }
}
