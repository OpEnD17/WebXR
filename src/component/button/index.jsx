const Button = props => {

    const height = props.height;
    const width = props.width;
    const style = {
        height,
        width,
        backgroundColor: "rgb(0,116,224)",
        borderRadius: "5px",
        float: "right",
        cursor: "pointer",
        color: "white",
        fontSize: "15px",
        lineHeight: height,
        textAlign: "center"
    }

    return (
        <>
            <div style={style}>{props.prompt}</div>
        </>
    );
}

export default Button;
