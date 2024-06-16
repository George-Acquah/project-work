// /utils/contexts/table.context.tsx

import React, { createContext, useContext, useState, useCallback } from "react";

interface TableContextType {
  selectedRows: string[];
  isRowSelected: (id: string) => boolean;
  handleRowSelection: (id: string, checked: boolean) => void;
  handleSelectAllRows: (ids: string[], checked: boolean) => void;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const isRowSelected = useCallback(
    (id: string) => selectedRows.includes(id),
    [selectedRows]
  );

  const handleRowSelection = useCallback((id: string, checked: boolean) => {
    setSelectedRows((prevSelectedRows) =>
      checked
        ? [...prevSelectedRows, id]
        : prevSelectedRows.filter((rowId) => rowId !== id)
    );
  }, []);

  const handleSelectAllRows = useCallback((ids: string[], checked: boolean) => {
    setSelectedRows(checked ? ids : []);
  }, []);

  return (
    <TableContext.Provider
      value={{
        selectedRows,
        isRowSelected,
        handleRowSelection,
        handleSelectAllRows,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTable must be used within a TableProvider");
  }
  return context;
};
