import React from "react";
import "./Card.css";

const Card: React.FC<{
    className: string;
    children?: React.ReactNode | React.ReactNode[];
}> = (props) => {
    const classes = "card " + props.className;
    return <div className={classes}>{props.children}</div>;
};

export default Card;
