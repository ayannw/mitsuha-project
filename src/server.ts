import { createServer, IncomingMessage, ServerResponse } from 'http';
import { success } from '@ayanthedev/colorlogs';

export function start(): void {
  const port = 9000;
  const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    response.end('Online.');
  });
  server.listen(port, (): void => {
    success('server started, port: ' + port);
  });
}
