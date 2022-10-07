export const create = (name, attri) => {
    const ele = document.createElement(name);
    Object.keys(attri).forEach(key => {
        ele.setAttribute(key, attri[key]);
    })
    return ele;
}