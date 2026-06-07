export const config = {
  runtime: 'edge',
};
import server from '../dist/server/index.mjs';

export default function handler(request, event) {
  return server.fetch(request, event);
}
