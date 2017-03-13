import React from 'react';

const Field = (props) => {
    return(
      <form onSubmit={props.handleSubmit} className="form-inline">
        <input className="form-control" type="text" onChange={props.handleChange} value={props.name} />
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    );
};

export default Field;
