import { createServer, IncomingMessage, ServerResponse } from 'http';

export function start(){
  const port = 6969;
  const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    response.end('Online.');
  });
  server.listen(port, () => {});
}
