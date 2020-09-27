import React, { useState, FC, useCallback, useMemo } from 'react';
import { Dropdown, Menu, Checkbox, Button } from 'antd';

import { DownOutlined } from '@ant-design/icons';
import { RowCategoryName, columnCategory } from '../../../../../../models/app.models';

import './table-panel.scss';

interface ITPanel {
  columns: columnCategory[];
  rows: RowCategoryName[];
  onSelectCategories: (columns: columnCategory[]) => void;
  onSelectRowCategories: (row: RowCategoryName[]) => void;
  onShowRows: () => void;
  onHideRows: () => void;
  isAnythingHidden: boolean;
  isAnythingSelected: boolean;
}

export const TPanel: FC<ITPanel> = ({
  columns,
  rows,
  onSelectCategories,
  onSelectRowCategories,
  onShowRows,
  onHideRows,
  isAnythingHidden,
  isAnythingSelected,
}) => {
  const [isOpenCategoryMenu, setOpenCategoryMenu] = useState(false);
  const [isOpenColumnMenu, setOpenColumnMenu] = useState(false);
  const [checkedColumns, setCheckedColumns] = useState<columnCategory[]>(columns);
  const [checkedCategories, setCheckedCategories] = useState<RowCategoryName[]>(rows);

  const onChangeRowCategories = useCallback(
    (checkedValues: RowCategoryName[]) => {
      setCheckedCategories(checkedValues);
      onSelectRowCategories(checkedValues);
    },
    [onSelectRowCategories],
  );
  const onChangeCategories = useCallback(
    (checkedValues: columnCategory[]) => {
      setCheckedColumns(checkedValues);
      onSelectCategories(checkedValues);
    },
    [onSelectCategories],
  );

  const hideCategoryMenu = useCallback(() => setOpenColumnMenu(false), []);
  const hideRowCategoryMenu = useCallback(() => setOpenCategoryMenu(false), []);

  const categoriesMenu = useMemo(
    () => (
      <Menu>
        <Menu.Item>
          <Checkbox.Group
            onChange={onChangeCategories}
            options={columns}
            value={checkedColumns}
            className="panel_checkbox-group"
          />
        </Menu.Item>
        <Menu.Item>
          <Button onClick={hideCategoryMenu}>Ok</Button>
        </Menu.Item>
      </Menu>
    ),
    [checkedColumns, columns, onChangeCategories, hideCategoryMenu],
  );

  const rowCategoriesMenu = useMemo(
    () => (
      <Menu>
        <Menu.Item>
          <Checkbox.Group
            onChange={onChangeRowCategories}
            options={rows}
            value={checkedCategories}
            className="panel_checkbox-group"
          />
        </Menu.Item>
        <Menu.Item>
          <Button onClick={hideRowCategoryMenu}>Ok</Button>
        </Menu.Item>
      </Menu>
    ),
    [onChangeRowCategories, rows, checkedCategories, hideRowCategoryMenu],
  );

  return (
    <div className="panel_header-wrapper">
      <Dropdown
        overlay={categoriesMenu}
        visible={isOpenColumnMenu}
        trigger={['click']}
        placement="bottomLeft"
      >
        <Button onClick={() => setOpenColumnMenu(!isOpenColumnMenu)}>
          Columns <DownOutlined />
        </Button>
      </Dropdown>
      <Dropdown
        overlay={rowCategoriesMenu}
        visible={isOpenCategoryMenu}
        trigger={['click']}
        placement="bottomLeft"
      >
        <Button onClick={() => setOpenCategoryMenu(!isOpenCategoryMenu)}>
          Row Categories <DownOutlined />
        </Button>
      </Dropdown>
      <div className="button-group">
        <Button onClick={onShowRows} disabled={isAnythingHidden ? true : false}>
          Show
        </Button>
        <Button onClick={onHideRows} disabled={isAnythingSelected ? true : false}>
          Hide
        </Button>
      </div>
    </div>
  );
};
