import React, { useState, FC } from 'react';
import { Dropdown, Menu, Checkbox, Button } from 'antd';

import { DownOutlined } from '@ant-design/icons';
import { RowCategoryName, columnCategory } from '../../../../../../models/app.models';

import './table-panel.scss';

interface IPanel {
  columns?: columnCategory;
  rows?: RowCategoryName;
  onDisplayDataShow?: () => void;
  onDisplayDataHide?: () => void;
}

export const Panel: FC<IPanel> = ({ columns = [], rows = [], onDisplayDataShow, onDisplayDataHide }) => {
  const [isOpenCategoryMenu, setOpenCategoryMenu] = useState(false);
  const [isOpenColumnMenu, setOpenColumnMenu] = useState(false);
  const [checkedColumns, setCheckedColumns] = useState(Array.from(columns));
  const [checkedCategories, setCheckedCategories] = useState(Array.from(rows));

  const onSelectRowCategories = (checkedValues: []) => {
    event.stopPropagation();
    setCheckedCategories(checkedValues);
  };
  const onSelectCategories = (checkedValues: []) => {
    event.stopPropagation();
    setCheckedColumns(checkedValues);
  };

  const hideCategoryMenu = () => {
    setOpenColumnMenu(false);
  };
  const categoriesMenu = (
    <Menu>
      <Menu.Item>
        <Checkbox.Group
          onChange={onSelectCategories}
          options={Array.from(columns)}
          value={checkedColumns}
          className="theader-checkbox-group"
        />
      </Menu.Item>
      <Menu.Item>
        <Button onClick={hideCategoryMenu}>Ok</Button>
      </Menu.Item>
    </Menu>
  );
  const hideRowCategoryMenu = () => {
    setOpenCategoryMenu(false);
  };

  const rowCategoriesMenu = (
    <Menu>
      <Menu.Item>
        <Checkbox.Group
          onChange={onSelectRowCategories}
          options={Array.from(rows)}
          value={checkedCategories}
          className="theader-checkbox-group"
        />
      </Menu.Item>
      <Menu.Item>
        <Button onClick={hideRowCategoryMenu}>Ok</Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="theader_header-wrapper">
      <Dropdown overlay={categoriesMenu} visible={isOpenColumnMenu} trigger={['click']} placement="bottomLeft">
        <Button
          onClick={() => {
            setOpenColumnMenu(!isOpenColumnMenu);
          }}
        >
          Columns <DownOutlined />
        </Button>
      </Dropdown>
      <Dropdown overlay={rowCategoriesMenu} visible={isOpenCategoryMenu} trigger={['click']} placement="bottomLeft">
        <Button
          onClick={() => {
            setOpenCategoryMenu(!isOpenCategoryMenu);
          }}
        >
          Row Categories <DownOutlined />
        </Button>
      </Dropdown>
      <div className="button-group">
        <Button
          onClick={onDisplayDataShow}
          disabled={!checkedColumns.length && !checkedCategories.length ? true : false}
        >
          Show
        </Button>
        <Button
          onClick={onDisplayDataHide}
          disabled={!checkedColumns.length && !checkedCategories.length ? true : false}
        >
          Hide
        </Button>
      </div>
    </div>
  );
};
