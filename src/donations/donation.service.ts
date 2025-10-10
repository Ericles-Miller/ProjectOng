import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class DonationService {
  constructor(@InjectRepository(Donation) private readonly donationsRepository: Repository<Donation>) {}

  async findDonationsByUserId(userId: string): Promise<Donation[]> {
    try {
      return await this.donationsRepository.find({ where: { donorId: userId } });
    } catch {
      throw new InternalServerErrorException('Error finding donations');
    }
  }

  async findDonationsByCampaignId(campaignId: string): Promise<Donation[]> {
    try {
      return await this.donationsRepository.find({ where: { campaignId } });
    } catch {
      throw new InternalServerErrorException('Error finding donations');
    }
  }
}
