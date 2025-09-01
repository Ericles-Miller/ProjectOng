import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Ngo } from 'src/ngos/entities/ngo.entity';

@Entity('campaigns')
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200, nullable: false, unique: true })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  goalAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  currentAmount: number;

  @Column({ type: 'date', nullable: false })
  startDate: Date;

  @Column({ type: 'date', nullable: false })
  endDate: Date;

  @Column({ type: 'varchar', length: 20, default: 'active' })
  status: 'active' | 'completed' | 'cancelled';

  @ManyToOne(() => Ngo, { nullable: false })
  ngo: Ngo;

  @Column({ type: 'uuid', nullable: false })
  ngoId: string;

  @CreateDateColumn()
  createdAt: Date;

  constructor(
    title: string,
    description: string,
    goalAmount: number,
    startDate: Date,
    endDate: Date,
    ngoId: string,
  ) {
    this.title = title;
    this.description = description;
    this.goalAmount = goalAmount;
    this.startDate = startDate;
    this.endDate = endDate;
    this.ngoId = ngoId;
  }
}
