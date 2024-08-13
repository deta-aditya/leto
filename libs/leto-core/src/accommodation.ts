/**
 * Entity Models
 */

export type Accommodation = {
  id: number;
  name: string;
  city: string;
  country: string;
  pictures: string[];
  star: number;
  description: string;
  facilities: string[];
};

export type Unit = {
  id: number;
  accommodationId: number;
  name: string;
  picture: string;
  rate: number;
};

/**
 * Data Transfer Models
 */

export type AccommodationRateMap = {
  accommodationId: number;
  rate: number;
};

export type AccommodationDisplayItem = {
  id: number;
  picture: string;
  name: string;
  location: string;
  rate: number;
};

export type AccommodationDisplayDetails = {
  pictures: string[];
  star: number;
  name: string;
  location: string;
  description: string;
  facilities: string[];
};

export type UnitDisplayItem = {
  id: number;
  name: string;
  picture: string;
  rate: number;
};
