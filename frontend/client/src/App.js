// client/src/App.js

import './App.css';
import {React, Component} from 'react';
import axios from 'axios';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      phrase: "",
      phraseBIP39: "",
      strength:128,
      wordlist:"EN",
    };
  }

  genMnemonic = async()=>{
    console.log(this.state.strength)
    axios.post(`http://localhost:3001/mnemonic`, {strength:this.state.strength,wordlist:this.state.wordlist })
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log(res.data.message);
        this.setState({
          phrase :res.data.message
        })
      })
    
    console.log("req sent")
  }

  genMnemonicBIP39 = async()=>{
    console.log("res");
    axios.post(`http://localhost:3001/bip39/mnemonic`, {strength:this.state.strength,wordlist:this.state.wordlist })
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log(res.data.message);
        this.setState({
          phraseBIP39 :res.data.message
        })
      })
    
    console.log("req sent")
  }

  changeStrength = (event) => {
    this.setState({strength:event.target.value})
    console.log(event.target.value)
  }

  changeLanguage = (event) => {
    this.setState({wordlist:event.target.value})
    console.log(event.target.value)
  }

  render(){
    return(
      <div className="App">
        <h1>Mnemonic phrase generator</h1>
        Select entropy length:<br />
        <select onChange={this.changeStrength}>
          <option value='128'>128</option>
          <option value='160'>160</option>
          <option value='192'>192</option>
          <option value='224'>224</option>
          <option value='256'>256</option>
        </select>
        <br /><br />

        Select word list:<br />
        <select onChange={this.changeLanguage}>
          <option value='chinese_simplified'>chinese_simplified</option>
          <option value='chinese_traditional'>chinese_traditional</option>
          <option value='english' selected='selected'>english</option>
          <option value='french'>french</option>
          <option value='italian'>italian</option>
          <option value='japanese'>japanese</option>
          <option value='spanish'>spanish</option>
          <option value='korean'>korean</option>
        </select>
        <br /><br />

        <button onClick={this.genMnemonic}>
          generate
        </button>
        <br /><br />

        mnemonic words:<br />
        <br />
        {this.state.phrase}
        <br /><br />

        mnemonic words generated with BIP39 node package<br />
        <br /><br />
        <button onClick={this.genMnemonicBIP39}>
          generate default
        </button>
        <br /><br />

        mnemonic words:<br />
        <br />
        {this.state.phraseBIP39}
      </div>
    );
  }
}

export default App;
