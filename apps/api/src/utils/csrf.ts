import { doubleCsrf } from 'csrf-csrf';
import * as process from 'node:process';

const csrfInstance = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET ?? 'secretbigsecret',
});

export default csrfInstance;
