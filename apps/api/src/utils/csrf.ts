import { doubleCsrf } from 'csrf-csrf';
import { ConfigService } from '@nestjs/config';

const csrfInstance = (configService: ConfigService) =>
  doubleCsrf({
    getSecret: () => configService.get<string>('CSRF_SECRET'),
  });

export default csrfInstance;
