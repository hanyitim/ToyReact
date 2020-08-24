export function createElement(tagName,attribute,...children){
    console.log(tagName,children);
    let e = document.createElement(tagName);
    for(let p in attribute){
        e.setAttribute(p,attribute[p]);
    }
    for(let child of children){
        if(typeof child === 'string'){
            child = document.createTextNode(child);
        }
        e.appendChild(child);
    }
    return e; 
}