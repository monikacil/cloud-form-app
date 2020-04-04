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

  setEmail(event) {
    this.setState({ email: event.target.value })
  }

  setUrl(event) {
    this.setState({ url: event.target.value })
  }

  showInFrame = (el) => {
    if (el !== this.state.selectedUrl) {
      this.setState({selectedUrl: el})
    }
  }

  handleSend = (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      elementsAPI.get({ email: this.state.email }).then( (user) => {
        if(user !== null) {
          let list = user.urls
          if(!list.includes(this.state.url)) {
            list.push(this.state.url)
            elementsAPI.update({ email: user.email, urls: list }).then( (user) => {
              this.setState({ urlsList: list, url: '' });
              this.showInFrame()
            })
          } else {
            alert('This url exist in database')
          }
        } else {
          let list = []
          list.push(this.state.url)
          elementsAPI.create({ email: this.state.email, urls: list }).then( (user) => {
            this.setState({ urlsList: list, url: '' });
            this.showInFrame()
          })
        }
      })
    } else {
      alert('Please fill all fields')
      this.forceUpdate();
    }
  }

  handleShowList = () => {
    if (this.validator.fieldValid('email')) {
      elementsAPI.get({ email: this.state.email })
      .then( (user) => {
        if(user) {
          let list = user.urls
          this.setState({ urlsList: list })
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
                  <li key={el} title={el} onClick={() => this.showInFrame(el)}
                      className={el === this.state.selectedUrl ? 'selected' : ''}>{el}</li>
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
