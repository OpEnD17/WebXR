import "./index.css";

const Input = props => {

    const height = props.height - 4;
    const width = props.width;
    const style = {
        height,
        width,
        borderRadius: "5px",
        float: "right",
        fontSize: "15px",
        border: "1px solid #fff"
    }

    return (
        <>
            <input className="input" style={style} placeholder={props.prompt}/>
        </>
    );
};

export default Input;
