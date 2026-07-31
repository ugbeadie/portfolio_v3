export type Experiment = {
  slug: string;
  title: string;
  blurb: string;
  url: string;
  repo?: string;
  poster?: string;
  video?: string;
  tags?: string[];
};

export const experiments: Experiment[] = [
  {
    slug: "image-trail",
    title: "Image Trail",
    blurb:
      "Photographs drop along the path the pointer travels, then fade out behind it.",
    url: "/playground/image-trail",
    video: "/playground/image-trail.mp4",
  },
  {
    slug: "ticker-scroller",
    title: "Ticker Scroller",
    blurb:
      "Four columns wrapping endlessly in opposite directions, chasing the wheel rather than following it.",
    url: "/playground/ticker-scroller",
    video: "/playground/ticker-scroll.mp4",
  },
];

export const HOME_EXPERIMENT_COUNT = 3;
