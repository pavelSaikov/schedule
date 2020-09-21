import { ReactText } from 'react';

import { ITableRowInfo } from '../../table-schedule.models';

export const rowSelection = {
  onChange: (selectedRowKeys: ReactText[], selectedRows: ITableRowInfo[]): void => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record): { disabled: boolean; name: string } => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};
