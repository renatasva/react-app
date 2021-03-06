import React from 'react';
import TableHeader from "./tableHeader";
import TableBody from "./tableBody"

//by destructuring props argument we get rid of line 7
// const Table = props => {
  // const { columns, sortColumn, onSort, data } = props;

const Table = ({ columns, sortColumn, onSort, data }) => {

  return ( 
    <table className="table">
      <TableHeader 
        columns={columns} 
        sortColumn={sortColumn} 
        onSort={onSort} 
      />
      <TableBody 
        columns={columns} 
        data={data}
      />
    </table>
  );
}
 
export default Table;