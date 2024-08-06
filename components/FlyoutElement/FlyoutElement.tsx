import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteAllItems } from '../../redux/slices/selectedItems';
import ExportCSV from '../ExportCSV/ExportCSV';
import styles from './FlyoutElement.module.scss';

function FlyoutElement() {
  const dispatch = useAppDispatch();
  const { selectedList } = useAppSelector((state) => state.selectedItems);

  return (
    <>
      {Boolean(selectedList.length) && (
        <div className={styles.flyout}>
          <h2 className={styles.header}>
            Heroes selected: {selectedList.length}
          </h2>
          <div className={styles.btns}>
            <button
              className={styles.delete}
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
