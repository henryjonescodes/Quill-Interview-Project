import { compareItems, rankItem } from "@tanstack/match-sorter-utils";
import { FilterFn, Row, SortingFn, sortingFns } from "@tanstack/react-table";
import { useEffect } from "react";


// * * * * * * * FILTERS * * * * * * * //

export const multipleFilter: FilterFn<string[]> = (
  row: Row<any>,
  columnId: string,
  filterValue: string[],
  addMeta: any
) => {
  if(!filterValue) return true
  
  let _verdict: boolean = false
  
  filterValue.forEach((val : string) => {
    const itemRank = rankItem(row.getValue(columnId), val);
    addMeta({
      itemRank,
    });
    if(itemRank.passed) _verdict = true;
  })
  return _verdict
};

export const dateRangeFilter: FilterFn<Date[]> = (
  row: Row<any>,
  columnId: string,
  filterValue: [Date, Date],
  addMeta: any
) => {
  if (!Array.isArray(filterValue) || filterValue.length !== 2 || !filterValue[0] || !filterValue[1]) {
    return true;
  }

  const [start, end] = filterValue.map(d => new Date(d));
  const rowValue = new Date(row.getValue(columnId));
  const isInDateRange = rowValue >= start && rowValue <= end;

  addMeta({ itemRank: getRankForDate(row, columnId)});

  return isInDateRange;
};


export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);

    addMeta({
      itemRank,
    });

    return itemRank.passed;
  };

// * * * * * * * SORTERS * * * * * * * //

export const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

export const dateRangeSort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  const rankA = rowA.columnFiltersMeta[columnId]?.itemRank ?? getRankForDate(rowA, columnId);
  const rankB = rowB.columnFiltersMeta[columnId]?.itemRank ?? getRankForDate(rowB, columnId);;

  if (rankA > rankB) return dir ? -1 : 1;
  if (rankA < rankB) return dir ? 1 : -1;
  return 0;
};

// * * * * * * *  HOOKS  * * * * * * * //

export const  useItemRank = (data, dateColumnIds) => {
  useEffect(() => {
    data.forEach((row) => {
      dateColumnIds.forEach((columnId) => {
        const rowValue = new Date(row.values[columnId]);
        const itemRank = -rowValue.getTime(); // Negative because you want most recent dates to come first
        row._meta = { ...row._meta, [`${columnId}ItemRank`]: itemRank };
      });
    });
  }, [data, dateColumnIds]);
}

// * * * * * PRIVATE HELPERS * * * * * //

const getRankForDate =  (
  row: Row<any>,
  columnId: string,
) => {
  const rowValue = new Date(row.getValue(columnId));

const itemRank =  rowValue.getTime() 
  return itemRank
}