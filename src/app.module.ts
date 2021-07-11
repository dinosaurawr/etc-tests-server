import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'test.db',
      autoLoadEntities: true,
      cli: {
        migrationsDir: 'migrations',
      },
      migrations: ['migrations/*.ts'],
    }),
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
})
export class AppModule {}
