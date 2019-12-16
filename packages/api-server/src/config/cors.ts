import { configService, EnvField } from './environment/service';
export const corsOptions = {
  origin: configService.get(EnvField.FRONT_END_DOMAIN),
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Accept',
  credentials: true,
};
