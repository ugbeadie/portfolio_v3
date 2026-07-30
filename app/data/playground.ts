export type Experiment = {
  slug: string;
  title: string;
  blurb: string;
  url: string;
  repo?: string;
  poster: string;
  video?: string;
  tags?: string[];
};

export const experiments: Experiment[] = [];

export const HOME_EXPERIMENT_COUNT = 3;
