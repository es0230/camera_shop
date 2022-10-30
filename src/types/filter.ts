export type Filter = {
  category: {
    photocamera: boolean,
    videocamera: boolean,
  },
  type: {
    digital: boolean,
    film: boolean,
    snapshot: boolean,
    collection: boolean,
  },
  level: {
    zero: boolean,
    amateur: boolean,
    professional: boolean,
  }
};