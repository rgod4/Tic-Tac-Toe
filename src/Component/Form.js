import React, { Component } from 'react'

class Form extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             user1:"Player 1",
             user2:"Player 2"
        }
    }
    
    handlechange1=(event)=>{
        this.setState({
            user1: event.target.value
        })
    }
    handlechange2=(event)=>{
        this.setState({
            user2: event.target.value
        })
    }

    handlesubmission=(event)=>{
        event.preventDefault();
        this.props.sendData({...this.state});

    }
    render() {
        return (
            <>
                <form onSubmit={this.handlesubmission}>
                    <div className="inpbox">
                        <label htmlFor="user1" className="red">Player X Name : </label>
                        <input id="user1" className="red" type="text" onChange={this.handlechange1} value={this.state.user1} placeholder="Enter Name"></input>
                    </div>
                    <div className="inpbox">
                        <label htmlFor="user2" className="green">Player O Name : </label>
                        <input id="user2" type="text" className="green" onChange={this.handlechange2} value={this.state.user2} placeholder="Enter Name"></input>
                    </div>
                    <input className="btn" type="submit" value="Play"></input>
                </form>
            </>
        )
    }
}

export default Form
