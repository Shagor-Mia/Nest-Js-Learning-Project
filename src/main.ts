import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Add Morgan middleware
  app.use(morgan('dev')); // or 'combined', 'tiny', etc.

  await app.listen(process.env.PORT ?? 5000, () => {
    console.log('server running on port 5000.');
  });
}
bootstrap().catch((err) => {
  console.error('Failed to start the app', err);
  process.exit(1); // Optional: Exit with failure code
});
