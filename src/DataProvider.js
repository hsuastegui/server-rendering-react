import React from 'react';

class DataProvider extends React.Component {
  static propTypes = {
    data: React.PropTypes.object
  };
  static childContextTypes = {
    data: React.PropTypes.object,
  };
  getChildContext () {
    //console.log('from data provider');
    //console.log(this.props.data);
    return {
      data: this.props.data
    };
  }
  render () {
    return this.props.children;
  }
}
export default DataProvider;
