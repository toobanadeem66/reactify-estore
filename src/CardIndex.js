import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./CardStyles.css";
import Card from "./Card";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Card />
  </StrictMode>,
  rootElement
);
export default Card
