import React from 'react';

const List = (props) => {
  const html = props.users.map((item, index) => {
    return(
      <p key={index}>{item.name}</p>
    );
  });
  return <div>{html}</div>
};

export default List;
