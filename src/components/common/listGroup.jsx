import React from 'react';

//by destructuring props argument we get rid of line 5
// const ListGroup = (props) => {
//   const { items, textProperty, valueProperty, selectedItem, onItemSelect } = props;

const ListGroup = ({ items, textProperty, valueProperty, selectedItem, onItemSelect }) => {

  return (
    <ul className="list-group">
      {items.map(item =>
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={item === selectedItem ? "list-group-item-action list-group-item active" : "list-group-item-action list-group-item"}
          >
          {item[textProperty]}
          </li>
      )}
    </ul>
   );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
}

export default ListGroup;
