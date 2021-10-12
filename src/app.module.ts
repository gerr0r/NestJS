import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArtistsModule } from './artists/artists.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ArtistsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        database: config.get('DB_NAME'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        autoLoadEntities: true,
        synchronize: true
      })
    })
  ]
})
export class AppModule {}
