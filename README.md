# ghoster

ExpressJS middleware that clones response data and acts as offline man-in-the-middle.

## Usage:

```javascript
import { Cloner, ILogger } from '@bbergan/ghoster';
const myLogger: ILogger;
const cloner = new Cloner(
  {
    cloneDir: '/path/to/directory/',
    target: 'https://xkcd.com/',
    targetName: 'someName'
  },
  myLogger
);
app.use(clonder.middleware.bind(cloner));
```
