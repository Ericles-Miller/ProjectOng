import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { DonationsModule } from './donations/donations.module';
import { RatingsModule } from './ratings/ratings.module';
import { dataSourceOptions } from './database/database-provider';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UsersModule,
    ProjectsModule,
    CampaignsModule,
    DonationsModule,
    RatingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
