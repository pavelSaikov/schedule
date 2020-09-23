import { Button, Checkbox, Dropdown, Menu } from 'antd';
import React, { useCallback, useMemo, useState, FC } from 'react';

interface IDropdownSelector {
  categories: string[];
  checkedCategories: string[];
  onCheckedCategoriesChange: (values: string[]) => void;
  buttonText: string;
}

export const DropdownSelector: FC<IDropdownSelector> = ({
  categories,
  checkedCategories,
  onCheckedCategoriesChange,
  buttonText,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const eventCategoriesMenu = useMemo(
    () => (
      <Menu>
        <Menu.Item title="Columns">
          <Checkbox.Group
            onChange={onCheckedCategoriesChange}
            options={categories}
            value={checkedCategories}
            className="table_checkbox-group"
          />
        </Menu.Item>
      </Menu>
    ),
    [checkedCategories, categories, onCheckedCategoriesChange],
  );

  const changeVisibility = useCallback((flag: boolean) => setIsVisible(flag), []);

  return (
    <Dropdown overlay={eventCategoriesMenu} onVisibleChange={changeVisibility} visible={isVisible}>
      <Button type="primary">{buttonText}</Button>
    </Dropdown>
  );
};
