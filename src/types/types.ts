export type photosType = {
  small: string;
  large: string;
};

export type usersType = {
  name: string;
  id: number;
  uniqueUrlName: string;
  photos: photosType;
  status: string;
  followed: boolean;
};
