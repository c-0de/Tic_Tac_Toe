import React, { Component } from 'react';
import Cell from './Cell';
import './tic_tak_toe.css';
import {Ai} from './Ai';

var chn='x';
var Allow = true;
var con = true;
class Game extends Component{

    constructor(){
        super();
        this.state={
            Grid:[],
        }
    }

    componentDidMount(){
        let grid = this.new_grid();
        this.setState({Grid:grid});
    }

    turnO(){
        document.getElementById("O").style.borderBottomColor="white";
        document.getElementById("O").style.color="wheat";
        document.getElementById("X").style.borderBottomColor="transparent";
        document.getElementById("X").style.color="white";
    }
    turnX(){
        document.getElementById("O").style.borderBottomColor="transparent";
        document.getElementById("O").style.color="white";
        document.getElementById("X").style.borderBottomColor="white";
        document.getElementById("X").style.color="wheat";
    }

    choose(c){

        document.getElementById("O").disabled = true;
        document.getElementById("X").disabled = true;

        if(c === "o"){
            this.turnO();
            this.AI();
            /*let cn = document.getElementById(`row-${0}col-${0}`).childNodes;
            cn[0].innerHTML="O";
            C+=2;
            const grid = [...this.state.Grid];
            grid[0][0].marked=true;
            this.setState({Grid:grid,Allow:true});
            setTimeout(()=>{
                this.turnX();
            },500);*/
        }
        else{
            this.turnX();
        }
    }

    handleclick(row,col){
        if(chn === "x"){

            console.log(document.getElementById('mode')[0].selected);
            let cn = document.getElementById(`row-${row}col-${col}`).childNodes;
            if(cn[0].innerHTML==="" && con){
                cn[0].innerHTML="X";

                const grid = [...this.state.Grid];
                grid[row][col].marked=true;
                this.setState({Grid:grid});
                let rval = this.check();
                if(rval !== 1){
                    this.outcome(rval);
                }

                if(Allow){
                    this.turnO();
                    this.AI();
                }
            }
        }
    }

    check(){

        let rslt = 1;
        const grid = [...this.state.Grid];

        let tgrid=[];

        for(let i=0;i<grid.length;i++){
            let itgrid=[];
            for(let j=0;j<grid[i].length;j++){
                let mrk = document.getElementById(`row-${i}col-${j}`).childNodes;
                itgrid.push(mrk[0].innerHTML);
            }
            tgrid.push(itgrid);
        }

        if((tgrid[0][0]==='O' && tgrid[0][1]==='O' && tgrid[0][2]==='O') || (tgrid[1][0]==='O' && tgrid[1][1]==='O' && tgrid[1][2]==='O') || (tgrid[2][0]==='O' && tgrid[2][1]==='O' && tgrid[2][2]==='O') || (tgrid[0][0]==='O' && tgrid[1][0]==='O' && tgrid[2][0]==='O') || (tgrid[0][1]==='O' && tgrid[1][1]==='O' && tgrid[2][1]==='O') || (tgrid[0][2]==='O' && tgrid[1][2]==='O' && tgrid[2][2]==='O'))
            return rslt = 2;

        if((tgrid[0][0]==='X' && tgrid[0][1]==='X' && tgrid[0][2]==='X') || (tgrid[1][0]==='X' && tgrid[1][1]==='X' && tgrid[1][2]==='X') || (tgrid[2][0]==='X' && tgrid[2][1]==='X' && tgrid[2][2]==='X') || (tgrid[0][0]==='X' && tgrid[1][0]==='X' && tgrid[2][0]==='X') || (tgrid[0][1]==='X' && tgrid[1][1]==='X' && tgrid[2][1]==='X') || (tgrid[0][2]==='X' && tgrid[1][2]==='X' && tgrid[2][2]==='X'))
            return rslt = 0;

        if((tgrid[0][0]==='O' && tgrid[1][1]==='O' && tgrid[2][2]==='O') || (tgrid[2][0]==='O' && tgrid[1][1]==='O' && tgrid[0][2]==='O'))
            return rslt = 2;

        if((tgrid[0][0]==='X' && tgrid[1][1]==='X' && tgrid[2][2]==='X') || (tgrid[2][0]==='X' && tgrid[1][1]==='X' && tgrid[0][2]==='X'))
            return rslt = 0;
        
        let flag=0;
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(tgrid[i][j] === ""){
                    flag=1;
                    break;
                }
            }
            if(flag) break;
        }

        if(!flag) rslt = 3;

        return rslt;
    }

    outcome(rlt){
        if(rlt === 1) document.getElementById("result").innerHTML="Draw";
        else if(rlt === 2){
            con=false;
            document.getElementById("result").innerHTML="O Won";
        }
        else if(rlt === 0){
            con=false;
            document.getElementById("result").innerHTML="X Won";
        }
        else{
            Allow=false;
            document.getElementById("result").innerHTML="Draw";
        }
    }

    AI(){

        chn = 'o';
        const grid = [...this.state.Grid];

        let tgrid=[];

        for(let i=0;i<grid.length;i++){
            let itgrid=[];
            for(let j=0;j<grid[i].length;j++){
                let mrk = document.getElementById(`row-${i}col-${j}`).childNodes;
                itgrid.push(mrk[0].innerHTML);
            }
            tgrid.push(itgrid);
        }

        let res = Ai(tgrid);

        setTimeout(() => {
            let cn = document.getElementById(`row-${res[0]}col-${res[1]}`).childNodes;
            cn[0].innerHTML="O";
        }, 400);

        

        setTimeout(()=>{
            grid[res[0]][res[1]].marked=true;
            this.setState({Grid:grid});
            this.turnX();
            chn='x';
            let rval = this.check();
            if(rval !== 1){
            this.outcome(rval);
        }
        },800);
    }

    render(){
        const grid = this.state.Grid;
        return(
            <>
                <div className="menu">
                    <select id="mode" className="g_mode">
                        <option>P v Com</option>
                        <option>P v P</option>
                    </select>
                    <button className="x" id="X" onClick={()=>{this.choose("x")}}>X -</button>
                    <button className="o" id="O" onClick={()=>{this.choose("o")}}>O -</button>
                </div>
                <div className="grid">
                    {grid.map((Row,rowidx)=>{
                        return(
                            <div key={rowidx} className="incell">
                                {Row.map((Col,colidx)=>{
                                    const {row,col,marked} = Col;
                                    return(
                                        <Cell
                                            key={colidx}
                                            row={row}
                                            col={col}
                                            marked={marked}
                                            onclick={(row,col)=>{this.handleclick(row,col)}}
                                        />
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                <div>
                    <button id="result" onClick={() => window.location.reload()}></button>
                </div>
            </>
        )
    }

    new_grid(){
        let grid= []; 
        for(let i=0;i<3;i++){
            let ingrid = [];
            for(let j=0;j<3;j++){
                ingrid.push(this.cell_pos(i,j));
            }
            grid.push(ingrid);
        }
        return grid;
    }

    cell_pos(row,col){
        return{
            row,
            col,
            marked:false,
        }
    }
}

export default Game;