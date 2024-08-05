export type ITableProps = {
  data: any[];
  columns: { label: string; name: string }[];
  loading: boolean;
  setSelectedRow?: Function;
  actions?: { action: string, do: Function }[];
};
