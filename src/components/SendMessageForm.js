import React from 'react';

class SendMessageForm extends React.Component {
  constructor() {
    super();
    this.state = {
      message: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log(e.target.value)
    this.setState({
      message: e.target.value
    });
  }

  handleSubmit(e){
    e.preventDefault()
    console.log(this.state.message)
    this.props.sendMessage(this.state.message)
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="send-message-form"
      >
        <input
          disabled={this.props.disabled}
          onChange={this.handleChange}
          value={this.state.message}
          placeholder="type your message here"
          type="text"
        />
      </form>
    );
  }
}

export default SendMessageForm;
