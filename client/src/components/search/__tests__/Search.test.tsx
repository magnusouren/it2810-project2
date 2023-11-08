import { fireEvent, screen, waitFor } from '@testing-library/react';

import { GET_MOVIES_BY_TITLE } from '../../../graphql/queries';
import { renderWithProviders } from '../../../utils/testUtils';
import Search from '../Search';

describe('Search', () => {
  it('Should render input field', () => {
    renderWithProviders(<Search />);
    expect(screen.getByRole('textbox')).toBeDefined();
  });

  it('Should match snapshot', () => {
    const { container } = renderWithProviders(<Search />);
    expect(container).toMatchSnapshot();
  });

  it('Should show dropdown when input field is focused and has value', async () => {
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
            ],
          },
        },
      },
    ];

    renderWithProviders(<Search />, mocks);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foo' } });
    fireEvent.focus(screen.getByRole('textbox'));

    await waitFor(() => {
      expect(screen.getByRole('list')).toBeDefined();
    });
  });
});
