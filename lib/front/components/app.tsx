import React from "react";
require("sanitize.css");

import "../styles/app.pcss";
import "../styles/app.scss";

export class App extends React.Component {
  state = {
    count: false
  };

  constructor(props) {
    super(props);

    if (!props.ssr) {
      const client = new Faye.Client("/faye");
      client.subscribe("/count", count => {
        this.setState(Object.assign({}, { count }));
      });
    }
  }

  render() {
    return (
      <>
        <header className="header">
          <div className="header__background" />
          <div className="header__title">
            <h1>
              <span className="header__namespace-text">front</span> namespace
              <small>Powered by Witney</small>
            </h1>
            <div className="header__icons">
              <svg viewBox="0 0 25 25">
                <use href="#home" />
              </svg>
              <svg viewBox="0 0 25 25">
                <use href="#rocket" />
              </svg>
              <svg viewBox="0 0 25 25">
                <use href="#smile" />
              </svg>
            </div>
          </div>
          {this.state.count !== false ? (
            <div className="header__count">{this.state.count}</div>
          ) : null}
        </header>
      </>
    );
  }
}
