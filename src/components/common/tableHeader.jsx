import React, { Component } from 'react';

class TableHeader extends Component {
  raiseSort = path => {
    //first we clone the existing sortColumn object
    const sortColumn = {...this.props.sortColumn};
    if (sortColumn.path === path)
    //if paths are the same we need to change the order
      sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
    //if path is different...
    else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
   }
   this.props.onSort(sortColumn);
  };

  //we set renderSortIcon method to an arrow function that 
  //takes a current column we are rendering
  renderSortIcon = column => {
    //we use object descructuring to simplify the code below
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  render() { 
    return ( 
    <thead>
      <tr>
        {this.props.columns.map(column => (
          //we do 'or column.key' because last two th are empty and doesnt have a path
        <th 
          className="clickable"
          key={column.path || column.key} 
          onClick={() => this.raiseSort(column.path)} 
        >
          { column.label } {this.renderSortIcon(column)}
        </th>
        ))}
      </tr>
    </thead> );
  }
}
 
export default TableHeader;