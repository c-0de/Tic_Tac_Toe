import React,{Component} from 'react';
import './cell.css';

class Cell extends Component{
    constructor(){
        super();
    }

    render(){
        const {row,col,marked,onclick} = this.props;
        const extraClassName = marked?"true":"false";
        return(
            <div onClick={()=>{onclick(row,col)}} id={`row-${row}col-${col}`} className={extraClassName}>
                <h1 className="clk"></h1>
            </div>
        )
    }
}

export default Cell;