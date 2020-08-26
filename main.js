import {
    createElement,
    render,
    Component
} from './toy-react';

class MyComponent extends Component{
    constructor(){
        super();
        this.state = {
            a:1,
            b:2
        }
    }
    render(){
        return (
            <div>
                <h1>my Component</h1>
                {/* 这里如果a没有toString，toy-react的type判断会出问题，没有textwraper包住，导致异常 */}
                <p>{this.state.a.toString()}</p> 
                <p>{this.state.b.toString()}</p> 
                <button onClick={()=>{this.setState({a:++this.state.a})}}>add</button>
            </div>
        )
    }
}
window.a = (
    <MyComponent className="page" data-disable="true">
        <div>123123</div>
        <div>1</div>
        <div>2</div>
        <div></div>
    </MyComponent>
);
render(
    <MyComponent className="page" data-disable="true">
        <div>123123</div>
        <div>1</div>
        <div>2</div>
        <div></div>
    </MyComponent>,
    document.body
);