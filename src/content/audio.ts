/**
 * The track behind the vinyl player.
 *
 * Drop an mp3 into `public/audio/` and point `src` at it. Until a file exists
 * the disc still spins and clicks — it just has no sound.
 *
 * If the track is CC-BY, fill in `license` and `sourceUrl`: the player renders
 * a credit line from them, which is what actually discharges the attribution
 * the licence requires. CC0 and the Pixabay licence need no credit — leave
 * both empty and the line disappears.
 */
export const vinylTrack = {
  title: "Waveloom",
  artist: "Pixabay",
  src: "/audio/track.mp3",
  /** Pixabay's licence requires no credit, so no line renders. */
  license: "",
  /** Link back to the track page, required by most attribution licences. */
  sourceUrl: "",
};
