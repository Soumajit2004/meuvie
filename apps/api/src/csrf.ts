import { doubleCsrf } from 'csrf-csrf';

const csrfInstance = doubleCsrf({ getSecret: () => 'secrettokenforuser' });

export default csrfInstance;