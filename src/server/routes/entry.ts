import * as path from 'path';
import * as config from 'config';
import { route } from './decorator';

/**
 * 前端构建信息
 */
let buildMeta: {
  [chunk: string]: string;
} = {};

if (!config.get('isDev')) {
  try {
    buildMeta = require(path.join(
      config.get('root') as string,
      'buildMeta.json',
    ));
  } catch (e) {}
}

/**
 * 处理 webpack dev server 和 node server 端口不一致
 */
function fileResolver(file: string) {
  if (config.get('isDev')) {
    return `http://${require('ip').address()}:${config.get(
      'webpack.port',
    )}${file}`;
  } else {
    return `${config.get('onlineHost')}${file}`;
  }
}

export class EntryController {
  @route('get', '/')
  async entry() {
    /**
     * 程序的入口文件
     */
    const mainFile = buildMeta['app'] || 'app.js';

    const browserConfig = {
      prod: config.get('isProd'),
      graphqlUri: config.get('graphqlUri'),
    };

    return `<html>
      <head>
        <title>抖友好物说</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
        <script>
          var fontSize = window.innerWidth / 1024 * 75;
          document.documentElement.style.fontSize = fontSize + 'px';
        </script>
      </head>
      <body>
          <div id="app">
          </div>
          <script>
            var config = ${JSON.stringify(browserConfig)}
          </script>
          <script src="${fileResolver('/statics/' + mainFile)}"></script>
      </body>
    </html>`;
  }
}
