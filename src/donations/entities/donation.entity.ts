import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Campaign } from '../../campaigns/entities/campaign.entity';

@Entity('donations')
export class Donation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  amount: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  donorName?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  donorEmail: string;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({ type: 'boolean', default: false })
  anonymous: boolean;

  @ManyToOne(() => User, { nullable: true })
  donor: User;

  @Column({ type: 'uuid', nullable: true })
  donorId: string;

  @ManyToOne(() => Campaign, { nullable: false })
  campaign: Campaign;

  @Column({ type: 'uuid', nullable: false })
  campaignId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    amount: number,
    anonymous: boolean,
    campaignId: string,
    message?: string,
    donorName?: string,
    donorEmail?: string,
  ) {
    this.amount = amount;
    this.donorName = donorName || '';
    this.donorEmail = donorEmail || '';
    this.message = message || '';
    this.anonymous = anonymous;
    this.campaignId = campaignId;
  }
}
