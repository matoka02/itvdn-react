import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { graphql, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { renderWithProviders } from '../../utils/test-utils';
import { Extra } from './Extra';
import { Episode } from '../../services/rickandmorty';


describe('Extra', () => {
  const responsePages: Record<string, Episode[]> = {
    "1": [
      {
        name: "Pilot",
        air_date: "December 2, 2013",
        episode: "S01E01",
        characters: [
          {
            id: "1",
            name: "Rick Sanchez",
            image: "/avatar/1.jpeg",
          },
          {
            id: "2",
            name: "Morty Smith",
            image: "/avatar/2.jpeg",
          },
        ],
      },
      {
        name: "Lawnmower Dog",
        air_date: "December 9, 2013",
        episode: "S01E02",
        characters: [
          {
            id: "1",
            name: "Rick Sanchez",
            image: "/avatar/1.jpeg",
          },
          {
            id: "2",
            name: "Morty Smith",
            image: "/avatar/2.jpeg",
          },
          {
            id: "38",
            name: "Beth Smith",
            image: "/avatar/38.jpeg",
          },
        ],
      },
    ],
    "2": [
      {
        name: "Anatomy Park",
        air_date: "December 16, 2013",
        episode: "S01E03",
        characters: [
          {
            id: "1",
            name: "Rick Sanchez",
            image: "/avatar/1.jpeg",
          },
          {
            id: "2",
            name: "Morty Smith",
            image: "/avatar/2.jpeg",
          },
          {
            id: "12",
            name: "Alexander",
            image: "/avatar/12.jpeg",
          },
        ],
      },
    ],
  };

  const handlers = [
    graphql.query('GetEpisodesPage', ({ query, variables }) => {
      const { page } = variables;
      const index = page as string;

      return HttpResponse.json({
        data: {
          episodes: {
            results: responsePages[index],
          },
        },
      });
    }),
  ];

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  const nextButton = () => screen.getByRole('button', { name: 'Next' });
  const prevButton = () => screen.getByRole('button', { name: 'Previous' });

  it("should render", async () => {
    renderWithProviders(<Extra />);

    expect(await screen.findByText('Pilot')).toBeInTheDocument();
  });

  it("should show episodes from the first page initially", async () => {
    renderWithProviders(<Extra />);

    expect(await screen.findByText('Pilot')).toBeInTheDocument();
    expect(await screen.findByText('Lawnmower Dog')).toBeInTheDocument();
  });

  it("should show episodes from next page when click 'Next'", async () => {
    renderWithProviders(<Extra />);

    expect(await screen.findByText('Pilot')).toBeInTheDocument();
    await userEvent.click(nextButton());
    expect(await screen.findByText('Anatomy Park')).toBeInTheDocument();
  });

  it("should show episodes from previous page when click 'Previous'", async () => {
    renderWithProviders(<Extra />);

    await userEvent.click(nextButton());
    expect(await screen.findByText('Anatomy Park')).toBeInTheDocument();

    await userEvent.click(prevButton());
    expect(await screen.findByText('Pilot')).toBeInTheDocument();
    expect(await screen.findByText('Lawnmower Dog')).toBeInTheDocument();
  });

  it("has 'Previous' button disabled on the first page", async () => {
    renderWithProviders(<Extra />);

    // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.logTestingPlaygroundURL();
    expect(prevButton()).toBeDisabled();
  });

  it("has 'Previous' button enabled on the second page", async () => {
    renderWithProviders(<Extra />);

    await userEvent.click(nextButton());
    expect(prevButton()).toBeEnabled();
  });
})