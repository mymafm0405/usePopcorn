import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import Rating from "./Rating";

// function Test() {
//   const [star, setStar] = useState(null);
//   return (
//     <>
//       <Rating
//         color="blue"
//         maxValue={3}
//         onSet={setStar}
//         messages={["Bad", "Good", "Excellent"]}
//         defaultRating={1}
//       />
//       <p>This movie is {star} stars</p>
//     </>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Rating />
    <Test /> */}
    <App />
  </React.StrictMode>
);
