import React, { Component } from 'react'

class GameGrid extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cells: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            turn: 0,
            count: 0,
            gameover: false
        }
        this.selected=[[0,0,0],[0,0,0],[0,0,0]]
        this.val = [["", ""], [this.props.names.user1, 'X'], [this.props.names.user2, 'O']];
        this.heading = `${this.val[1][0]}'s Turn`;
        this.btnref = React.createRef();
    }

    handleClick = (event) => {
        if (event.target.localName !== "td")
            return;

        let idx = event.target.id;
        let i = Number(idx[0]);
        let j = Number(idx[1]);

        if (this.state.cells[i][j] === 0) {
            this.heading = `${this.val[2 - this.state.turn][0]}'s Turn`;
            this.setState((prev) => {
                return {
                    cells: prev.cells.map((x, a) => {
                        return (
                            x.map((y, b) => {
                                if (a === i && b === j)
                                    return prev.turn + 1;
                                else
                                    return y;
                            }))
                    }),
                    turn: 1 - prev.turn,
                    count: prev.count + 1
                }
            }, () => {
                this.checkWin(i, j, { ...this.state });
            });
        }
    }

    checkWin = (i, j, state) => {
        let Cells = state.cells;
        let c1 = true;
        for (let k = 0; k < 3; k++) {
            if (Cells[i][k] !== Cells[i][j]) {
                c1 = false;
                break;
            }
        }
        let c2 = true;
        for (let k = 0; k < 3; k++) {
            if (Cells[k][j] !== Cells[i][j]) {
                c2 = false;
                break;
            }
        }
        let c3 = false;
        if ((i === j) && (Cells[1][1] === Cells[2][2]) && (Cells[1][1] === Cells[0][0])){
            c3 = true;
            this.selected[0][0]=this.selected[1][1]=this.selected[2][2]=1;
        }
        if ((i === 0 && j === 2) || (i === 1 && j === 1) || (i === 2 && j === 0)) {
            if ((Cells[1][1] === Cells[0][2]) && (Cells[1][1] === Cells[2][0])){
                c3 = true;
                this.selected[0][2]=this.selected[1][1]=this.selected[2][0]=1;    
            }
        }

        if (c1 || c2 || c3) {
            if(c1){
                for (let k = 0; k < 3; k++) 
                    this.selected[i][k]=1;
            }
            else if(c2){
                for (let k = 0; k < 3; k++)
                    this.selected[k][j]=1;
            }
            this.heading = `${this.val[Cells[i][j]][0]} wins the game`;
            this.setState({ gameover: true })
        }
        else if (state.count === 9) {
            this.heading = `Game Drawn`;
            this.setState({ gameover: true })
        }
    }

    playagain = () => {
        this.heading = "Let's Begin game";
        this.selected=[[0,0,0],[0,0,0],[0,0,0]];
        this.setState({
            cells: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            turn: 0,
            count: 0,
            gameover: false
        })
    }

    render() {
        let { cells } = this.state;
        let gamewithoutbtn=(
            <>
                <h1 className={this.state.turn?"green":"red"}>{this.heading}</h1>
                <table onClick={this.handleClick}>
                    <tbody>
                        {
                            cells.map((x, i) => {
                                return (
                                    <tr key={i}>
                                        {
                                            x.map((y, j) => {
                                                return (
                                                    <td className={(this.selected[i][j]?"selected ":"")+(cells[i][j]===1?"red":"green")} key={j} id={`${i}${j}`}>{this.val[y][1]}</td>
                                            )
                                        })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </>
        )

        if(this.state.gameover){
            return (
                <> 
                    {
                    gamewithoutbtn
                    }  
                    <div ref={this.btnref} className={this.state.gameover ? "show" : "hide"}>
                        <button className="btn" onClick={this.playagain}>Play Again</button>
                    </div>
                </>
            )
        }
        else
            return gamewithoutbtn;
    }
}

export default GameGrid