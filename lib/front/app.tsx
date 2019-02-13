import React from "react";
import { render } from "react-dom";
import { App } from "./components/app";
import svg from "./assets/svgs.svg.txt";

const registerWorkBox = function() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration => {
        console.log("SW registered: ", registration);
      })
      .catch(registrationError => {
        console.log("SW registration failed: ", registrationError);
      });
  });
};

const appendSvg = function(elString, parent?: string) {
  var div = document.createElement("div");
  div.innerHTML = elString;
  var svgEl = div.firstChild as SVGElement;
  svgEl.style["display"] = "none";
  const parentEl = document.querySelector(parent || "body");
  if (parentEl) {
    parentEl.appendChild(svgEl);
  }
};

appendSvg(svg);

render(<App />, document.querySelector("#app"));
