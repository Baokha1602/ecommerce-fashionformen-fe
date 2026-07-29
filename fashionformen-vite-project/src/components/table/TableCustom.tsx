import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

interface TableCustomProps<T> extends TableProps<T> {
  // Add any custom props here if needed
}

const TableCustom = <T extends object>(props: TableCustomProps<T>) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <Table 
        pagination={{ pageSize: 10, showSizeChanger: true }}
        scroll={{ x: 'max-content' }}
        {...props} 
      />
    </div>
  );
};

export default TableCustom;
