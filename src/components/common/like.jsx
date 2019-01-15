import React from 'react';

//this component is a controlled component because it receives all the data it needs via props, 
//and it notifies any changes to the data again by using props, so it doesnt have any state itself
//we dont have any helper methods, an event handlers, we only have a render method
//so we can turn this component into a stateless function component and simplify this code

const Like = props => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i 
      onClick={props.onClick} 
      style={{cursor: "pointer"}} 
      className={classes}>
  </i> 
  );
}

export default Like;