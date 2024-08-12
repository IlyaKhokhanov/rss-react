import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import * as reduxHooks from '../../hooks';
import userEvent from '@testing-library/user-event';
import FlyoutElement from '../../components/FlyoutElement/FlyoutElement';

describe('FyoutElement', () => {
  it('should rendering FyoutElement', async () => {
    vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
      selectedList: [
        { id: '1', url: '1/1/1/1', name: 'Fedya' },
        { id: '2', url: '2/2/2/2', name: 'Fedya' },
        { id: '1', url: '1/1/1/1', name: 'Fedya' },
        { id: '2', url: '2/2/2/2', name: 'Fedya' },
      ],
    });

    render(
      <Provider store={store}>
        <FlyoutElement />
      </Provider>,
    );

    const heading = screen.getByRole('heading');

    const buttons = screen.getAllByRole('button');
    const user = userEvent.setup();
    await user.click(buttons[0]);
    expect(heading).toHaveTextContent('Heroes selected: 4');
  });
});
