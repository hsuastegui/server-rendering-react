import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import List from './list';
import Field from './field';

class App extends Component {
  //Use context passed through DataProvider
  // constructor(props, context){
  //   super(props, context);
  //   this.state = {
  //     title: context.data ? context.data.title : 'Welcome',
  //     users: context.data ? context.data.users : props.users,
  //     name: ''
  //   }
  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   this.handleChange = this.handleChange.bind(this);
  // }
  constructor(props){
    super(props);
    this.state = {
      title: props.title,
      //users: props.users,
      name: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event){
    event.preventDefault();
    // Update component state
    this.setState({
      //users: [...this.state.users, { name: this.state.name }],
      name: ''
    });
    // Call redux action to add user
    this.props.actions.addUser({name: this.state.name});
  }
  handleChange(event){
    this.setState({
      name: event.target.value
    });
  }
  render() {
    return (
      <main className="container">
        <h1>{this.state.title}</h1>
        {this.props.children}
        <Field name={this.state.name} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
        {/* <List users={this.state.users} /> */}
        <List users={this.props.users} />
      </main>
    );
  }
}
App.propTypes = {
  users: React.PropTypes.array,
  title: React.PropTypes.string
};
App.defaultProps = {
  users: [],
  title: 'Hello'
};

//Context passed through DataProvider
// App.contextTypes = {
//   data: React.PropTypes.object
// };

//Redux boilerplate
const mapStateToProps = (state, ownProps) => {
	return {
		users: state.users
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
