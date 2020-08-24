class TextWrapper{
    constructor(tagName){
        this.root = document.createTextNode(tagName);
    }
}
class ElementWrapper{
    constructor(tagName){
        this.root = document.createElement(tagName);
    }
    setAttribute(name,value){
        this.root.setAttribute(name,value);
    }
    appendChild(component){
        this.root.appendChild(component.root);
    }
}
export class Component{
    constructor(){
        this.props = Object.create(null);
        this.children = [];
        this._root = null;
    }
    setAttribute(name,value){
        this.props[name] = value;
    }
    appendChild(component){
        this.children.push(component);
    }
    get root(){
        if(!this._root){
            this._root = this.render().root;
        }
        return this._root;
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
    parentElement.appendChild(component.root);
};

