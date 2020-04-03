import React, { Component } from 'react';
import IFrame from './IFrame';
import elementsAPI from './../api';
import SimpleReactValidator from 'simple-react-validator';

class Content extends Component {
  constructor () {
    super();

    this.state = {
      email: '',
      url: '',
      urlsList: [],
      selectedUrl: ''
    };

    this.validator = new SimpleReactValidator();
    this.showInFrame = this.showInFrame.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.setUrl = this.setUrl.bind(this)
  }
  
  componentDidMount() {
    // elementsAPI.get().then( (json) => console.log(json))
  }

  setEmail(event) {
    this.setState({ email: event.target.value })
  }

  setUrl(event) {
    this.setState({ url: event.target.value })
  }

  showInFrame = (el) => {
    if (el.url !== this.state.selectedUrl) {
      this.setState({selectedUrl: el.url})
    }
  }

  handleSend = (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      elementsAPI.create({ email: this.state.email, url: this.state.url }).then( (json) => console.log(json))
    } else {
      alert('Please fill all fields')
      this.forceUpdate();
    }
  }

  handleShowList = () => {
    if (this.validator.fieldValid('email')) {
      elementsAPI.get({ email: this.state.email })
      .then( (json) => {
        if(json) {
          this.setState({ urlsList: json.url })
        }
      })
    }
  }

  render() {
    return (
      <div className="content">
         <form id="form">
          <label htmlFor="email">Email</label>
          <input type="email" 
                id="email" 
                name="email" 
                value={this.state.email} 
                placeholder="Email adress" 
                onChange={this.setEmail}/>
          {this.validator.message('email', this.state.email, 'required|email')}

          <label htmlFor="url">URL</label>
          <input type="text" 
                id="url" 
                name="URL" 
                value={this.state.url} 
                placeholder="Provide url"
                onChange={this.setUrl} />
          {this.validator.message('url', this.state.url, 'required')}

        </form>
        <ul className="urlList">
          {this.state.urlsList.map( el => {
                return (
                  <li key={el.url} onClick={() => this.showInFrame(el)}
                      className={el.url === this.state.selectedUrl ? 'selected' : ''}>{el.url}</li>
                )
              }
            )}
        </ul>
        <IFrame selected={this.state.selectedUrl}></IFrame>
        <div className="buttons">
          <button id="show" onClick={this.handleShowList}>Show URL's list</button>
          <button id="submit" form="form" onClick={this.handleSend}>Submit</button>
        </div>
      </div>
    )
  }
}

export default Content;
