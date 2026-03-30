import ReactGA from "react-ga4";

const GA_ID = "G-2TB2G9PKB0";

export function initGA() {
  ReactGA.initialize(GA_ID);
}

export function trackPageView(path: string) {
  ReactGA.send({ hitType: "pageview", page: path });
}
