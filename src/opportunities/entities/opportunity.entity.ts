import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Ngo } from 'src/ngos/entities/ngo.entity';

@Entity('opportunities')
export class Opportunity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  location: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  cause: string;

  @Column({ type: 'date', nullable: false })
  startDate: Date;

  @Column({ type: 'date', nullable: false })
  endDate: Date;

  @Column({ type: 'int', nullable: false })
  maxVolunteers: number;

  @Column({ type: 'varchar', length: 20, default: 'open' })
  status: 'open' | 'closed' | 'completed';

  @ManyToOne(() => Ngo, { nullable: false })
  ngo: Ngo;

  @Column({ type: 'uuid', nullable: false })
  ngoId: string;

  @CreateDateColumn()
  createdAt: Date;

  constructor(
    title: string,
    description: string,
    location: string,
    cause: string,
    startDate: Date,
    endDate: Date,
    maxVolunteers: number,
    ngoId: string,
  ) {
    this.title = title;
    this.description = description;
    this.location = location;
    this.cause = cause;
    this.startDate = startDate;
    this.endDate = endDate;
    this.maxVolunteers = maxVolunteers;
    this.ngoId = ngoId;
  }
}
