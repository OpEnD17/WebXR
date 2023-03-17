export const create = (name: string, attri: object) :HTMLElement => {
    const ele : HTMLElement | null = document.createElement(name);
    Object.keys(attri).forEach(key => {
        ele.setAttribute(key, attri[key]);
    })
    return ele;
};

export const cleanupDOM = (id: string) :void => {
    const element: HTMLElement | null = document.getElementById(id);
    element && element.remove();
};

// export const create = (name, attri) => {
//     const ele = document.createElement(name);
//     Object.keys(attri).forEach(key => {
//         ele.setAttribute(key, attri[key]);
//     })
//     return ele;
// };

// export const cleanupDOM = id => {
//     const element = document.getElementById(id);
//     element && element.remove();
// };
