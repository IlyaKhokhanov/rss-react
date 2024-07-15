import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteAllItems } from '../../redux/slices/selectedItems';
import ExportCSV from '../ExportCSV/ExportCSV';
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

            <ExportCSV data={list} fileName={`${list.length}_heroes.csv`} />
          </div>
        </div>
      )}
    </>
  );
}

export default FlyoutElement;
