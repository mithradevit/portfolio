/**
 * Feature flags — sections that are built and working but not ready to show.
 *
 * Flip a value to `true` and the section comes back exactly as it was; nothing
 * is deleted, and the component keeps compiling either way so it can't rot
 * while it's switched off. This is the place to park anything waiting on real
 * content rather than commenting out JSX at the call site.
 *
 * These are build-time constants, not runtime config: Next tree-shakes the
 * `false` branches out of the client bundle, so a hidden section costs nothing
 * to ship.
 */
export const flags = {
  /**
   * The four-category photo grid on /about. Off until the real photos land —
   * every tile currently renders as an empty grey placeholder.
   */
  aboutPhotoGrid: false,

  /**
   * The arc photo carousel on /about, below the grid. Same reason: its cards
   * show category names on blank plates because there are no images yet.
   */
  aboutArcCarousel: false,
} as const;
