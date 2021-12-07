import React from 'react';
import { Component } from 'react';
import './App.css';
import Form from './Component/Form';
import GameGrid from './Component/GameGrid';

class App extends Component {
  constructor(props) {
    super(props)  
    this.state = {
      user1:"",
      user2:"",
      showgame:false
    }
    this.gameref=React.createRef();
    this.formref=React.createRef();
  }
  
  getdata=(data)=>{
    this.setState({
      user1:data.user1,
      user2:data.user2,
      showgame:true
    })
  }

  render(){
    // console.log(this.state);
    if(this.state.showgame===false){
      return (
        <div  className="form-cont">
          <Form sendData={this.getdata}/>
        </div>
      );
    }
    else{
      return (
          <div className="game-cont">
            <GameGrid names={this.state}/>
          </div>
      );
    }
  }
}

export default App;
