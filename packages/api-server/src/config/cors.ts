import { EnvField, getConfigService } from './environment/service';

export const getCorsOptions = () => ({
  origin: getConfigService().get(EnvField.FRONT_END_DOMAIN),
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Accept',
  credentials: true,
});
