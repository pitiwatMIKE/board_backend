import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { SeedService } from 'src/seed/seed.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const seeder = app.get(SeedService);
  await seeder.run();

  await app.close();
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
