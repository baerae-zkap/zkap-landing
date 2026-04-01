import ReactGA from "react-ga4";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export function initGA() {
  if (process.env.NODE_ENV === 'production' && GA_ID) {
    ReactGA.initialize(GA_ID);
  }
}

export function trackPageView(path: string) {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.send({ hitType: "pageview", page: path });
  }
}
