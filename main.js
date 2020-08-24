import {
    createElement,
    render,
    Component
} from './toy-react';

class MyComponent extends Component{
    render(){
        return (
            <div>
                <div>my Component</div>
                {this.children}
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