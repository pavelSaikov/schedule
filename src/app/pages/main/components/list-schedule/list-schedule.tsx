import './list-schedule.scss';

import { Button, Checkbox, List } from 'antd';
import Item from 'antd/lib/list/Item';
import cloneDeep from 'lodash.clonedeep';
import React, { useCallback, useEffect, useRef, useState, FC, MutableRefObject } from 'react';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import VList from 'react-virtualized/dist/commonjs/List';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';

import { IEvent, IEventCategory, RowCategoryName, TimeZone } from '../../../../models/app.models';
import { ListItem } from './components';
import { sortListItemsByDate, IListItemInfo } from './list-schedule.models';

interface IListSchedule {
  events: IEvent[];
  eventCategories: IEventCategory[];
  timeZone: TimeZone;
  onMoreClick: (id: string) => void;
}

export const ListSchedule: FC<IListSchedule> = ({ events, eventCategories, timeZone, onMoreClick }) => {
  const [listItems, setListItems] = useState<IListItemInfo[]>();
  const [listHiddenItems, setListHiddenItems] = useState<IListItemInfo[]>();
  const loadedRowsMap: MutableRefObject<number[]> = useRef([]);
  const [isAnySelectedItems, setIsAnySelectedItems] = useState(false);
  const [isAnyHiddenItems, setIsAnyHiddenItems] = useState(false);

  useEffect(() => {
    const listItems: IListItemInfo[] = events
      .map(e => {
        const items: IListItemInfo[] = [];
        const eventCategory: IEventCategory = {
          ...eventCategories.find(({ categoryName }) => categoryName === e.eventCategoryName),
        };

        const baseItem: IListItemInfo = {
          dateTime: e.dateTime,
          id: e.id,
          description: e.description,
          organizer: e.organizer,
          title: e.title,
          timeZone,
          eventCategory,
          isSelected: false,
        };
        items.push(baseItem);

        if (e.deadlineDate) {
          const eventCategory = {
            ...eventCategories.find(({ categoryName }) => categoryName === RowCategoryName.deadline),
          };
          items.push({
            ...baseItem,
            dateTime: e.deadlineDate,
            eventCategory,
          });
        }

        return items;
      })
      .flat()
      .sort(sortListItemsByDate);

    setListItems(listItems);
  }, [eventCategories, events, timeZone]);

  useEffect(() => {
    if (!listItems) {
      return;
    }

    const indexSelectedItem: number = listItems.findIndex(i => i.isSelected);
    setIsAnySelectedItems(indexSelectedItem !== -1);
  }, [listItems]);

  const onHideButtonClick = useCallback(
    () =>
      setListItems(items => {
        const selectedItems: IListItemInfo[] = cloneDeep(items.filter(i => i.isSelected));
        selectedItems.forEach(i => {
          i.isSelected = false;
        });

        const notSelectedItems: IListItemInfo[] = items.filter(i => !i.isSelected);

        setIsAnyHiddenItems(true);
        setIsAnySelectedItems(false);
        setListHiddenItems(items => (items ? [...items, ...selectedItems] : selectedItems));

        return notSelectedItems;
      }),
    [],
  );

  const onShowButtonClick = useCallback(
    () =>
      setListItems(items => {
        const newItems: IListItemInfo[] = [...items, ...listHiddenItems].sort(sortListItemsByDate);
        setListHiddenItems(null);
        setIsAnyHiddenItems(false);
        return newItems;
      }),
    [listHiddenItems],
  );

  const onCheckBoxClick = useCallback(
    (id: string, eventCategoryName: string) =>
      setListItems(items => {
        const clickedItem: IListItemInfo = cloneDeep(
          items.find(i => i.id === id && i.eventCategory.categoryName === eventCategoryName),
        );
        clickedItem.isSelected = !clickedItem.isSelected;

        const positionClickedItem: number = items.findIndex(
          i => i.id === id && i.eventCategory.categoryName === eventCategoryName,
        );
        const newItems: IListItemInfo[] = [...items];
        newItems.splice(positionClickedItem, 1, clickedItem);
        return newItems;
      }),
    [],
  );

  const isRowLoaded = useCallback(({ index }) => !!loadedRowsMap.current[index], []);

  const handleInfiniteOnLoad = useCallback(({ startIndex, stopIndex }) => {
    Array.from({ length: stopIndex - startIndex + 1 }, (_v, k) => k + startIndex).map(
      i => (loadedRowsMap.current[i] = 1),
    );
  }, []);

  const renderItem = useCallback(
    ({ index, key, style }) => {
      const i: IListItemInfo = { ...listItems[index] };

      return (
        <Item key={key} style={{ ...style, background: i.isSelected ? '#e6f7ff' : null }}>
          <Checkbox
            className="list-schedule_checkbox"
            onClick={() => onCheckBoxClick(i.id, i.eventCategory.categoryName)}
            checked={i.isSelected}
          />
          <ListItem itemInfo={i} onMoreClick={onMoreClick} />
        </Item>
      );
    },
    [listItems, onCheckBoxClick, onMoreClick],
  );

  const vList = useCallback(
    ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width }) => {
      if (!listItems) {
        return;
      }

      return (
        <VList
          autoHeight
          height={height}
          isScrolling={isScrolling}
          onScroll={onChildScroll}
          overscanRowCount={2}
          rowCount={listItems.length}
          rowHeight={200}
          rowRenderer={renderItem}
          onRowsRendered={onRowsRendered}
          scrollTop={scrollTop}
          width={width}
        />
      );
    },
    [listItems, renderItem],
  );

  const autoSize = useCallback(
    ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered }) => (
      <AutoSizer disableHeight>
        {({ width }) =>
          vList({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
            onRowsRendered,
            width,
          })
        }
      </AutoSizer>
    ),
    [vList],
  );

  const infiniteLoader = useCallback(
    ({ height, isScrolling, onChildScroll, scrollTop }) => {
      if (!listItems) {
        return;
      }

      return (
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={handleInfiniteOnLoad}
          rowCount={listItems.length}
        >
          {({ onRowsRendered }) =>
            autoSize({
              height,
              isScrolling,
              onChildScroll,
              scrollTop,
              onRowsRendered,
            })
          }
        </InfiniteLoader>
      );
    },
    [autoSize, handleInfiniteOnLoad, isRowLoaded, listItems],
  );

  return (
    <>
      {null}
      {listItems && (
        <div className="list-schedule_wrapper">
          <div className="list-schedule_buttons-container">
            <Button
              className="list-schedule_button"
              type="primary"
              onClick={onHideButtonClick}
              disabled={!isAnySelectedItems}
            >
              Hide
            </Button>
            <Button
              className="list-schedule_button"
              type="primary"
              onClick={onShowButtonClick}
              disabled={!isAnyHiddenItems}
            >
              Show
            </Button>
          </div>
          <List className="list-schedule_list" bordered>
            <WindowScroller>{infiniteLoader}</WindowScroller>
          </List>
        </div>
      )}
    </>
  );
};
