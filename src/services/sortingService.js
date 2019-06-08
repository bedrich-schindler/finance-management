/**
 * Sorts array of objects using custom comparator.
 *
 * @param array Array to be sorted.
 * @param cmp Comparator
 * @returns {array} Sorted array.
 */
export const sort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);

    if (order !== 0) {
      return order;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map(el => el[0]);
};

/**
 * Gets sort descending comparator.
 *
 * @param a Value A.
 * @param b Value B.
 * @param orderBy Attribute used for sorting.
 * @returns {number} Comparator result.
 */
export function sortDesc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

/**
 * Gets sort comparator.
 *
 * @param order Order used for sorting.
 * @param orderBy Attribute used for sorting.
 * @returns {function(*=, *=): number}
 */
export const getSorting = (order, orderBy) => (order === 'desc'
  ? (a, b) => sortDesc(a, b, orderBy)
  : (a, b) => -sortDesc(a, b, orderBy));
