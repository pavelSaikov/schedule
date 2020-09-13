import './colors-editor.scss';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Modal, Radio, Select, Space } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import cloneDeep from 'lodash.clonedeep';
import React, { useCallback, useState, FC, useEffect } from 'react';
import { TwitterPicker } from 'react-color';

import { IEventCategory } from '../../../models/app.models';

interface IColor {
  hex: string;
}

enum RadioBtn {
  background = 'Background',
  text = 'Text',
}

interface IColorsEditor {
  defaultEventCategories: IEventCategory[];
  currentEventCategory: IEventCategory;
  isVisible: boolean;
  isUserCanAddNewCategories: boolean;
  onOkClick: (eventCategories: IEventCategory[], selectedEventCategory: IEventCategory) => void;
  onCancelClick: () => void;
}

export const ColorsEditor: FC<IColorsEditor> = ({
  defaultEventCategories,
  currentEventCategory,
  isVisible,
  isUserCanAddNewCategories,
  onOkClick,
  onCancelClick,
}) => {
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>(currentEventCategory.categoryName);
  const [btnBgnColor, setBtnBgnColor] = useState<string>(currentEventCategory.backgroundColor);
  const [btnTextColor, setBtnTextColor] = useState<string>(currentEventCategory.textColor);
  const [eventCategories, setEventCategories] = useState<IEventCategory[]>(defaultEventCategories);
  const [isVisibleColorPicker, setIsVisibleColorPicker] = useState<boolean>(false);
  const [radioButtonVal, setRadioButtonVal] = useState<RadioBtn>(RadioBtn.background);

  useEffect(() => {
    setEventCategories(defaultEventCategories);
    const selectedEventCategory = {
      ...defaultEventCategories.find(e => e.categoryName === selectedCategoryName),
    };

    setBtnBgnColor(selectedEventCategory.backgroundColor);
    setBtnTextColor(selectedEventCategory.textColor);
  }, [defaultEventCategories, selectedCategoryName]);

  const onChangeRadioButton = useCallback((e: RadioChangeEvent) => setRadioButtonVal(e.target.value), []);

  const onChangeColor = useCallback(
    (newColor: IColor) => {
      radioButtonVal === RadioBtn.background ? setBtnBgnColor(newColor.hex) : setBtnTextColor(newColor.hex);

      const newEventCategories: IEventCategory[] = cloneDeep(eventCategories);
      newEventCategories.forEach(e => {
        if (e.categoryName === selectedCategoryName) {
          radioButtonVal === RadioBtn.background
            ? (e.backgroundColor = newColor.hex)
            : (e.textColor = newColor.hex);
        }
      });

      setEventCategories(newEventCategories);
    },
    [eventCategories, radioButtonVal, selectedCategoryName],
  );

  const onOk = useCallback(
    () =>
      onOkClick(eventCategories, { ...eventCategories.find(e => e.categoryName === selectedCategoryName) }),
    [eventCategories, onOkClick, selectedCategoryName],
  );

  const onCancel = useCallback(() => onCancelClick(), [onCancelClick]);

  const handleBtnChangeColor = useCallback(() => setIsVisibleColorPicker(!isVisibleColorPicker), [
    setIsVisibleColorPicker,
    isVisibleColorPicker,
  ]);

  const changeNewCategory = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setNewCategory(e.target.value),
    [],
  );

  const addNewCategory = useCallback(() => {
    if (!newCategory) {
      return;
    }

    const newEventCategory: IEventCategory = {
      id: '',
      categoryName: newCategory,
      textColor: 'black',
      backgroundColor: 'white',
      permissions: { isMapAvailable: true, isPhotosAvailable: true, isVideosAvailable: true },
    };

    setEventCategories(categories => [{ ...newEventCategory }, ...categories]);
    setNewCategory('');
  }, [newCategory]);

  const onCategoryClick = useCallback(
    (eventCategoryName: string) => {
      const selectedCategory = { ...eventCategories.find(e => e.categoryName === eventCategoryName) };
      setBtnBgnColor(selectedCategory.backgroundColor);
      setBtnTextColor(selectedCategory.textColor);
      setSelectedCategoryName(eventCategoryName);
    },
    [eventCategories],
  );

  return (
    <Modal centered title="Task category editor" visible={isVisible} onOk={onOk} onCancel={onCancel}>
      <Space direction={'vertical'} size={'middle'}>
        <Select
          className="modalWindow_Select"
          placeholder="select task category"
          defaultValue={selectedCategoryName}
          onChange={onCategoryClick}
          dropdownRender={menu => (
            <div>
              {menu}

              {isUserCanAddNewCategories && (
                <>
                  <Divider className="modalWindow_Select_Divider" />
                  <div className="modalWindow_InputContainer">
                    <Input className="modalWindow_Input" value={newCategory} onChange={changeNewCategory} />
                    <a className="modalWindow_addItemBtn" onClick={addNewCategory}>
                      <PlusOutlined /> Add item
                    </a>
                  </div>
                </>
              )}
            </div>
          )}
        >
          {eventCategories.map(task => (
            <Select.Option value={task.categoryName} key={task.categoryName}>
              {task.categoryName}
            </Select.Option>
          ))}
        </Select>
        <Radio.Group onChange={onChangeRadioButton} value={radioButtonVal}>
          <Radio value={RadioBtn.background}>{RadioBtn.background}</Radio>
          <Radio value={RadioBtn.text}>{RadioBtn.text}</Radio>
        </Radio.Group>
        <Button
          style={{ color: btnTextColor, backgroundColor: btnBgnColor }}
          type="default"
          onClick={handleBtnChangeColor}
        >
          Change background or text color
        </Button>
      </Space>
      {isVisibleColorPicker && (
        <TwitterPicker className="modalWindow_TwitterPicker" onChangeComplete={onChangeColor} />
      )}
    </Modal>
  );
};
