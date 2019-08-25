import React, { Component } from "react";
import SignaturePad from "react-signature-canvas";
import loading from "./loading.svg";
import styles from "./styles.module.css";
class Canvas extends Component {
  state = { trimmedDataURL: null };
  sigPad = {};
  constructor() {
    super();
    this.state.trimmedDataURL = null;
    this.state.char = "o";
  }
  clear = () => {
    this.sigPad.clear();
  };
  trim = () => {
    this.setState(
      { trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL("image/png") },
      () => {
        //pass the url
        let data = "http://localhost:3000/" + this.state.trimmedDataURL;
        this.setState({ char: "x" });
        return fetch("https://hiragana-search.appspot.com/img", {
          method: "POST",
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(data => {
            this.setState({ char: data }, () => {
              console.log("yaas!!!!");
            });
          });
      }
    );
  };
  render() {
    let { trimmedDataURL } = this.state;
    return (
      <div className="parent">
        <div className={styles.container}>
          <div className={styles.sigContainer}>
            <SignaturePad
              canvasProps={{ className: styles.sigPad + " lefty" }}
              ref={ref => {
                this.sigPad = ref;
              }}
              minWidth={3.0}
              maxWidth={6.0}
            />
          </div>
          <div>
            <button className={styles.buttons} onClick={this.clear}>
              Clear
            </button>
            <button className={styles.buttons} onClick={this.trim}>
              Enter
            </button>
          </div>
          {this.state.char === "x" ? (
            <div className="loading">
              {" "}
              <img src={loading}></img>{" "}
            </div>
          ) : (
            <div className="result">
              {this.state.char == "o" ? (
                <h2>Draw a hiragana character above.</h2>
              ) : (
                <h2>You have entered {this.state.char}.</h2>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Canvas;
