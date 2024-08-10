import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import * as reduxHooks from '../../hooks';
import userEvent from '@testing-library/user-event';
import Search from '../../components/Search/Search';

describe('Search', () => {
  it('should check input', async () => {
    vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
      searchString: '',
    });

    render(
      <Provider store={store}>
        <Search />
      </Provider>,
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    const user = userEvent.setup();
    await user.click(input);
    await user.keyboard('hello');
    await user.click(button);

    expect(input).toHaveValue('hello');
    expect(button).toHaveTextContent('Search');
  });
});
