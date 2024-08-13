import { None, Some } from '../../common/option';
import { createGetAccommodations } from './get-accommodations.impl';
import { GetAccommodationsDependencies, GetAccommodationsRequest } from './get-accommodations';

const DEPENDENCIES: GetAccommodationsDependencies = {
  getAccommodationsByPattern: async () => ([
    {
      id: 1,
      city: 'Jakarta',
      country: 'Indonesia',
      name: 'Hotel 1',
      pictures: ['url/to/some/picture.jpg'],
      description: 'Hotel description',
      facilities: ['Facility 1', 'Facility 2'],
      star: 4,
    },
    {
      id: 2,
      city: 'Bangkok',
      country: 'Thailand',
      name: 'Hotel 2',
      pictures: ['url/to/some/picture.jpg'],
      description: 'Hotel description',
      facilities: ['Facility 1', 'Facility 2'],
      star: 4,
    },
  ]),
  getRandomlyOrderedAccommodations: async () => ([
    {
      id: 2,
      city: 'Bangkok',
      country: 'Thailand',
      name: 'Hotel 2',
      pictures: ['url/to/some/picture.jpg'],
      description: 'Hotel description',
      facilities: ['Facility 1', 'Facility 2'],
      star: 4,
    },
    {
      id: 1,
      city: 'Jakarta',
      country: 'Indonesia',
      name: 'Hotel 1',
      pictures: ['url/to/some/picture.jpg'],
      description: 'Hotel description',
      facilities: ['Facility 1', 'Facility 2'],
      star: 4,
    },
    {
      id: 3,
      city: 'Denpasar',
      country: 'Indonesia',
      name: 'Hotel 3',
      pictures: ['url/to/some/picture.jpg'],
      description: 'Hotel description',
      facilities: ['Facility 1', 'Facility 2'],
      star: 4,
    },
  ]),
  getMinimumUnitRatesByAccommodationsIds: async () => [
    { accommodationId: 1, rate: 1000000 },
    { accommodationId: 2, rate: 2000000 },
    { accommodationId: 3, rate: 3000000 },
  ],
  getRandomIntegerOfRange: () => 0,
};

const REQUEST: GetAccommodationsRequest = {
  searchQuery: Some('Hotel'),
};

describe('GetAccommodations - Happy Paths', () => {
  it('should get accommodations with search query', async () => {
    const getAccommodations = createGetAccommodations(DEPENDENCIES);
    const response = await getAccommodations(REQUEST);

    expect(response).toStrictEqual({
      accommodations: [
        {
          id: 1,
          location: 'Jakarta, Indonesia',
          name: 'Hotel 1',
          picture: 'url/to/some/picture.jpg',
          rate: 1000000,
        },
        {
          id: 2,
          location: 'Bangkok, Thailand',
          name: 'Hotel 2',
          picture: 'url/to/some/picture.jpg',
          rate: 2000000,
        },
      ]
    })
  });

  it('should get randomly ordered accommodations without search query', async () => {
    const getAccommodations = createGetAccommodations(DEPENDENCIES);
    const response = await getAccommodations({
      ...REQUEST,
      searchQuery: None(),
    });

    expect(response).toStrictEqual({
      accommodations: [
        {
          id: 2,
          location: 'Bangkok, Thailand',
          name: 'Hotel 2',
          picture: 'url/to/some/picture.jpg',
          rate: 2000000,
        },
        {
          id: 1,
          location: 'Jakarta, Indonesia',
          name: 'Hotel 1',
          picture: 'url/to/some/picture.jpg',
          rate: 1000000,
        },
        {
          id: 3,
          location: 'Denpasar, Indonesia',
          name: 'Hotel 3',
          picture: 'url/to/some/picture.jpg',
          rate: 3000000,
        },
      ]
    });
  });

  it('should return early when no accommodations found', async () => {
    const getMinimumUnitRatesByAccommodationsIds = jest.fn(
      DEPENDENCIES.getMinimumUnitRatesByAccommodationsIds
    );

    const getAccommodations = createGetAccommodations({
      ...DEPENDENCIES,
      getAccommodationsByPattern: async () => [],
      getMinimumUnitRatesByAccommodationsIds,
    });

    const response = await getAccommodations(REQUEST);

    expect(response).toStrictEqual({
      accommodations: [],
    });
    expect(getMinimumUnitRatesByAccommodationsIds).not.toHaveBeenCalled();
  });
});
