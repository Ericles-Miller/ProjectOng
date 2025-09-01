import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from './entities/campaign.entity';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { Donation } from 'src/donations/entities/donation.entity';
import { CreateDonationDto } from 'src/donations/dto/create-donation.dto';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign) private readonly campaignsRepository: Repository<Campaign>,
    @InjectRepository(Donation) private readonly donationsRepository: Repository<Donation>,
  ) {}

  async create(
    { title, description, goalAmount, startDate, endDate }: CreateCampaignDto,
    ngoId: string,
  ): Promise<Campaign> {
    try {
      const campaignExists = await this.campaignsRepository.findOne({ where: { title } });

      if (campaignExists) {
        throw new BadRequestException('Campaign already exists');
      }

      const campaign = new Campaign(
        title,
        description,
        goalAmount,
        new Date(startDate),
        new Date(endDate),
        ngoId,
      );

      return await this.campaignsRepository.save(campaign);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error creating campaign');
    }
  }

  async findAll(): Promise<Campaign[]> {
    try {
      return await this.campaignsRepository.find();
    } catch {
      throw new InternalServerErrorException('Error fetching campaigns');
    }
  }

  async findOne(id: string): Promise<Campaign> {
    try {
      const campaign = await this.campaignsRepository.findOne({ where: { id } });

      if (!campaign) {
        throw new NotFoundException('Campaign not found');
      }

      return campaign;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error fetching campaign');
    }
  }

  async donate(
    id: string,
    { amount, donorName, donorEmail, message, anonymous }: CreateDonationDto,
  ): Promise<void> {
    try {
      const campaign = await this.campaignsRepository.findOne({ where: { id } });

      if (!campaign) {
        throw new NotFoundException('Campaign not found');
      }

      const donation = new Donation(amount, anonymous, id, message, donorName, donorEmail);

      await this.donationsRepository.save(donation);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error donating to campaign');
    }
  }
}
