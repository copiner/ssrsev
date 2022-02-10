import React from 'react';
import App from '../../src/route/index';
import routeConfig from '../../src/route/route.config';
import { matchRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { handleHtml, getStaticRoute } from '../util';

let staticRoute = [];
(async () => {
  staticRoute = await getStaticRoute(routeConfig);
})();

export default async (req, res, next) => {
  const { path, url } = req;
  console.log(url)
  if (url.indexOf('.') > -1) {
      // if(url.indexOf("png") > -1){
      //     res.writeHead(200, {'Content-Type': 'image/png'});
      // }
      res.end();
      return;
  }

  const branch = matchRoutes(staticRoute, path)[0];

  let component = {};

  if (branch) {
    component = branch.route.component;
  };

  let initialData = {};

  if (component.preFetch) {
    initialData = await component.preFetch();
  };

  const context = {
    initialData
  };

  // console.log(staticRoute)
  const reactStr = renderToString(
    <StaticRouter location={path} context={context}>
      <App routeConfig={staticRoute} />
    </StaticRouter>
  );

  //console.log("reactStr",reactStr)

  const htmlInfo = {
    reactStr,
    //styles: sheet.getStyleTags(),
    initialData: JSON.stringify(initialData)
  };

  if (context.url) {
    res.writeHead(302, {
      location: context.url
    });
    res.end();
  } else {
    const html = handleHtml(htmlInfo);
    res.send(html);
  }

  return next();
};
