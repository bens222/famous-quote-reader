import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Quote from './Quote';
import RoboPic from './RoboPic';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quotes: [],
      roboPic: {}
    }

    this.getQuote = this.getQuote.bind(this);
    this.handleUrl = this.handleUrl.bind(this);
  }

  getQuote() {
    axios({
      method: 'get',
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1',
      headers: { 
        'X-Mashape-Key': process.env.REACT_APP_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    })
    .then(response => response.data)
    .then(quote => this.setState({ quotes: quote }))
    .then(
      axios({
        method: 'get',
        url: `https://robohash.p.mashape.com/index.php?text=${Math.floor(Math.random() * 100)}`,
        headers: {
          'X-Mashape-Key': process.env.REACT_APP_KEY,
          'Accept': 'application/json'
        }
      })
      .then(response => response.data)
      .then(imageUrl => this.setState({ roboPic: imageUrl })),
    )
  }

  handleUrl(imageUrl) {
    this.setState({ roboPic: imageUrl })
  }

  render() {
    return (
      <div className='App'>
        <h1 className='pt-5'>Famous Quote Reader</h1>
        <div className='mt-5'>
          <button className='btn btn-info' onClick={ this.getQuote }>Get Quote!</button>
        </div>
        <div className='row mt-5'>
          <div className='col-sm-2'></div>
          <div className='col-sm-4'>
          {
            this.state.quotes.length > 0 && // The && is used here instead of ? because it is only an if statement instead of if else (binary instead of ternary)
            <div className='card'>
              <div className='card-header'>Here's your quote!</div>
              <div className='card-body'>
                {
                  this.state.quotes.map(quoteObject => (
                    <Quote
                      key={1}
                      text={ quoteObject.author }
                      quote={ quoteObject.quote }
                    />
                  ))
                }
              </div>
             </div>
          }
          </div>
          <div className='col-sm-4'>
            {
              this.state.quotes.length > 0 &&
              <RoboPic
                src={ this.state.roboPic.imageUrl }
              />
            }
          </div>
          <div className='col-sm-2'></div>
        </div>
      </div>
    );
  }
}

export default App;
