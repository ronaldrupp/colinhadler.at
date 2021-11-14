// log the pageview with their URL
export const pageview = (url) => {
    console.log(url)
  window.gtag("config", "G-V6V0151N9S", {
    page_path: url,
  });
};

// log specific events happening.
export const event = ({ action, params }) => {
  window.gtag("event", action, params);
};
