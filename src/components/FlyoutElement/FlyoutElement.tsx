import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteAllItems } from '../../redux/slices/selectedItems';
import ExportCSV from '../ExportCSV/ExportCSV';
import './FlyoutElement.scss';

function FlyoutElement() {
  const dispatch = useAppDispatch();
  const { selectedList } = useAppSelector((state) => state.selectedItems);

  return (
    <>
      {Boolean(selectedList.length) && (
        <div className="flyout">
          <h2 className="flyout-header">
            Heroes selected: {selectedList.length}
          </h2>
          <div className="flyout-btns">
            <button
              className="flyout-delete"
              onClick={() => dispatch(deleteAllItems())}
            >
              Unselect all
            </button>

            <ExportCSV
              data={selectedList}
              fileName={`${selectedList.length}_heroes.csv`}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default FlyoutElement;
