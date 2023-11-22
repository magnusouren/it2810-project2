import { fireEvent, screen, waitFor } from '@testing-library/react';

import { GET_MOVIES_BY_TITLE } from '../../../graphql/queries';
import { renderWithProviders } from '../../../utils/testUtils';
import Search from '../Search';

const mocks = [
  {
    request: {
      query: GET_MOVIES_BY_TITLE,
      variables: {
        title: 'foo',
        limit: 20,
      },
    },
    result: {
      data: {
        getMoviesByTitle: [
          {
            _id: '1',
            title: 'Foo',
          },
          {
            _id: '2',
            title: 'Bar',
          },
        ],
      },
    },
  },
];

describe('Search', () => {
  it('Should match snapshot', () => {
    const { container } = renderWithProviders({ child: <Search /> });
    expect(container).toMatchSnapshot();
  });

  it('Should match snapshot when dropdown is open', async () => {
    const { container } = renderWithProviders({ child: <Search />, mocks: mocks });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foo' } });
    fireEvent.focus(screen.getByRole('textbox'));

    await waitFor(() => {
      expect(screen.getByRole('list')).toBeDefined();
    });
    expect(container).toMatchSnapshot();
  });

  it('Should show dropdown when input field is focused and has value', async () => {
    renderWithProviders({ child: <Search />, mocks: mocks });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foo' } });
    fireEvent.focus(screen.getByRole('textbox'));

    await waitFor(() => {
      expect(screen.getByRole('list')).toBeDefined();
    });
  });

  it('Should hide dropdown when input field is blurred', async () => {
    renderWithProviders({ child: <Search />, mocks: mocks });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foo' } });
    fireEvent.focus(screen.getByRole('textbox'));

    await waitFor(() => {
      expect(screen.getByRole('list')).toBeDefined();
    });

    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('list')).toBeNull();
    });
  });

  it('Should call navigate with correct path when movie is selected', async () => {
    renderWithProviders({ child: <Search />, mocks: mocks });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foo' } });
    fireEvent.focus(screen.getByRole('textbox'));

    await waitFor(() => {
      expect(screen.getByRole('list')).toBeDefined();
    });
    fireEvent.click(screen.getByText('Foo'));
    expect(window.location.pathname).toBe('/movie/1');
  });

  it('Should hide dropdown when movie is selected', async () => {
    renderWithProviders({ child: <Search />, mocks: mocks });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foo' } });
    fireEvent.focus(screen.getByRole('textbox'));

    await waitFor(() => {
      expect(screen.getByRole('list')).toBeDefined();
    });
    fireEvent.click(screen.getByText('Foo'));
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('Should navigate to the first movie in the list when enter is pressed', async () => {
    renderWithProviders({ child: <Search />, mocks: mocks });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foo' } });
    fireEvent.focus(screen.getByRole('textbox'));

    await waitFor(() => {
      expect(screen.getByRole('list')).toBeDefined();
    });
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    expect(window.location.pathname).toBe('/movie/1');
  });

  it('Should hide dropdown when enter is pressed on selected movie', async () => {
    renderWithProviders({ child: <Search />, mocks: mocks });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foo' } });
    fireEvent.focus(screen.getByRole('textbox'));

    await waitFor(() => {
      expect(screen.getByRole('list')).toBeDefined();
    });
    fireEvent.keyDown(screen.getByText('Foo'), { key: 'Enter' });
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('Should hide dropdown when mouse is clicked outside searchfield', async () => {
    renderWithProviders({ child: <Search />, mocks: mocks });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foo' } });
    fireEvent.focus(screen.getByRole('textbox'));

    await waitFor(() => {
      expect(screen.getByRole('list')).toBeDefined();
    });

    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('Should shhow the correct message if no movies are found', async () => {
    const noMoviesMock = [
      {
        request: {
          query: GET_MOVIES_BY_TITLE,
          variables: {
            title: 'bar',
            limit: 20,
          },
        },
        result: {
          data: {
            getMoviesByTitle: [],
          },
        },
      },
    ];

    const { container } = renderWithProviders({ child: <Search />, mocks: noMoviesMock });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'bar' } });
    fireEvent.focus(screen.getByRole('textbox'));

    await waitFor(() => {
      expect(screen.getByRole('list')).toBeDefined();
    });
    expect(screen.getByText('No results found for "bar"')).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  it('Should show load more button when more than 20 movies are found and hidden if list it not filled', async () => {
    const moreThan20MoviesMock = [
      {
        request: {
          query: GET_MOVIES_BY_TITLE,
          variables: {
            title: 'The',
            limit: 20,
          },
        },
        result: {
          data: {
            getMoviesByTitle: [
              {
                _id: '1',
                title: 'The Foo',
              },
              {
                _id: '2',
                title: 'The Bar',
              },
              {
                _id: '3',
                title: 'The Foo',
              },
              {
                _id: '4',
                title: 'The Bar',
              },
              {
                _id: '5',
                title: 'The Foo',
              },
              {
                _id: '6',
                title: 'The Bar',
              },
              {
                _id: '7',
                title: 'The Foo',
              },
              {
                _id: '8',
                title: 'The Bar',
              },
              {
                _id: '9',
                title: 'The Foo',
              },
              {
                _id: '10',
                title: 'The Bar',
              },
              {
                _id: '11',
                title: 'The Foo',
              },
              {
                _id: '12',
                title: 'The Bar',
              },
              {
                _id: '13',
                title: 'The Foo',
              },
              {
                _id: '14',
                title: 'The Bar',
              },
              {
                _id: '15',
                title: 'The Foo',
              },
              {
                _id: '16',
                title: 'The Bar',
              },
              {
                _id: '17',
                title: 'The Foo',
              },
              {
                _id: '18',
                title: 'The Bar',
              },
              {
                _id: '19',
                title: 'The Foo',
              },
              {
                _id: '20',
                title: 'The Bar',
              },
            ],
          },
        },
      },
      {
        request: {
          query: GET_MOVIES_BY_TITLE,
          variables: {
            title: 'The',
            limit: 40,
          },
        },
        result: {
          data: {
            getMoviesByTitle: [
              {
                _id: '21',
                title: 'The New Foo',
              },
            ],
          },
        },
      },
    ];
    renderWithProviders({ child: <Search />, mocks: moreThan20MoviesMock });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'The' } });
    fireEvent.focus(screen.getByRole('textbox'));

    await waitFor(() => {
      expect(screen.getByRole('list')).toBeDefined();
    });

    expect(screen.getByText('Load more movies...')).toBeDefined();

    fireEvent.focus(screen.getByText('Load more movies...'));
    fireEvent.keyDown(screen.getByText('Load more movies...'), { key: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText('The New Foo')).toBeDefined();
    });

    expect(screen.queryByText('Load more movies...')).toBeNull();
  });
});
