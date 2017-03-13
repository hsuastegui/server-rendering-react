export default ({ body, title, state = {} }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>APP</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <link rel="shortcut icon" href="/assets/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <div id="root">${body}</div>
      </body>
      <script>window.__PRELOADED_STATE__= ${JSON.stringify(state)}</script>
      <script src="/assets/bundle.js"></script>
    </html>
  `;
};
