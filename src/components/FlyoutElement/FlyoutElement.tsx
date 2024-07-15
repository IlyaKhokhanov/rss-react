import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteAllItems } from '../../redux/slices/selectedItems';
import './FlyoutElement.scss';

function FlyoutElement() {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.selectedItems);

  return (
    <>
      {Boolean(list.length) && (
        <div className="flyout">
          <h2 className="flyout-header">Heroes selected: {list.length}</h2>
          <div className="flyout-btns">
            <button
              className="flyout-delete"
              onClick={() => dispatch(deleteAllItems())}
            >
              Unselect all
            </button>

            <button className="flyout-download" onClick={() => {}}>
              Download
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default FlyoutElement;
