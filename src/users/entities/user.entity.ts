import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Campaign } from '../../campaigns/entities/campaign.entity';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';
import { Rating } from '../../ratings/entities/rating.entity';
import { Donation } from '../../donations/entities/donation.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 2, nullable: false })
  state: string;

  @Column({ type: 'varchar', length: 20, default: 'volunteer' })
  userType: 'volunteer' | 'ngo';

  @Column({ type: 'simple-array', nullable: true })
  skills: string[];

  @Column({ type: 'text', nullable: true })
  experience: string;

  @Column({ type: 'simple-array', nullable: true })
  preferredCauses: string[];

  @OneToMany(() => Project, (project) => project.ngo)
  projects: Project[];

  @OneToMany(() => Campaign, (campaign) => campaign.ngo)
  campaigns: Campaign[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.volunteer)
  enrollments: Enrollment[];

  @OneToMany(() => Rating, (rating) => rating.fromUser)
  ratingsGiven: Rating[];

  @OneToMany(() => Rating, (rating) => rating.toUser)
  ratingsReceived: Rating[];

  @OneToMany(() => Donation, (donation) => donation.donor)
  donations: Donation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    name: string,
    email: string,
    password: string,
    city: string,
    state: string,
    userType: 'volunteer' | 'ngo' = 'volunteer',
    skills: string[] = [],
    experience: string = '',
    preferredCauses: string[] = [],
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.city = city;
    this.state = state;
    this.userType = userType;
    this.skills = skills;
    this.experience = experience;
    this.preferredCauses = preferredCauses;
  }
}
