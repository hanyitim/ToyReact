const REANDER_TO_DOM = Symbol('render to dom');
class TextWrapper{
    constructor(tagName){
        this.root = document.createTextNode(tagName);
    }
    [REANDER_TO_DOM](range){
        range.insertNode(this.root);
    }
}
class ElementWrapper{
    constructor(tagName){
        this.root = document.createElement(tagName);
    }
    setAttribute(name,value){
        if(name.match(/^on([\s\S]+)$/)){
            this.root.addEventListener(RegExp.$1.replace(/^[\s\S]/,c=>c.toLowerCase()),value);
        }else{
            this.root.setAttribute(name,value);
        }
    }
    appendChild(component){
        let range = document.createRange();
        range.setStart(this.root,this.root.childNodes.length);
        range.setEnd(this.root,this.root.childNodes.length);
        component[REANDER_TO_DOM](range);
    }
    [REANDER_TO_DOM](range){
        range.deleteContents();
        range.insertNode(this.root);
    }
}
export class Component{
    constructor(){
        this.props = Object.create(null);
        this.children = [];
        this._root = null;
        this._range = null;
        this.state = null;
    }
    setAttribute(name,value){
        this.props[name] = value;
    }
    appendChild(component){
        this.children.push(component);
    }
    [REANDER_TO_DOM](range){
        this._range = range;
        this.render()[REANDER_TO_DOM](range);
    }
    rerender(){
        this._range.deleteContents();
        this[REANDER_TO_DOM](this._range);
    }
    setState(newState){
        if(!this.state){
            this.state = newState;
            this.rerender();
            return false;
        }
        let merge = (oldState,newState)=>{
            for(let p in newState){
                if(Object.prototype.toString.call(newState[p]) === '[object Object]'){
                    oldState[p] = merge(oldState[p],newState[p]);
                }else{
                    oldState[p] = newState[p];
                }
            }
            return oldState;
        };
        merge(this.state,newState);
        this.rerender();
    }
}

export function createElement(type,attribute,...children){
    let e;
    if(typeof type === 'string'){
        e = new ElementWrapper(type);
    }else{
        e = new type;
    }
    for(let p in attribute){
        e.setAttribute(p,attribute[p]);
    }
    let inserChildren = (children)=>{
        for(let child of children){
            if(typeof child === 'string'){
                child = new TextWrapper(child);
            }
            if(Object.prototype.toString.call(child) === '[object Array]'){
                inserChildren(child);
            }else{
                e.appendChild(child);
            }
        }
    }
    inserChildren(children);
    return e; 
}

export function render(component,parentElement){
    let range = document.createRange();
    range.setStart(parentElement,0);
    range.setEnd(parentElement,parentElement.childNodes.length);
    range.deleteContents();
    component[REANDER_TO_DOM](range);
};