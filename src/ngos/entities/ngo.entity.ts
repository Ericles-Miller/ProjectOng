import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Campaign } from '../../campaigns/entities/campaign.entity';

@Entity('ngos')
export class Ngo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  organizationName: string;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  cnpj: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 2, nullable: false })
  state: string;

  @Column({ type: 'simple-array', nullable: false })
  causes: string[];

  @Column({ type: 'simple-array', nullable: false })
  areas: string[];

  @Column({ type: 'simple-array', nullable: true })
  skills: string[] = [];

  @Column({ type: 'simple-array', nullable: true })
  preferredCauses: string[] = [];

  @OneToMany(() => Project, (project) => project.ngo)
  projects: Project[];

  @OneToMany(() => Campaign, (campaign) => campaign.ngo)
  campaigns: Campaign[];

  @CreateDateColumn()
  createdAt: Date;

  constructor(
    organizationName: string,
    cnpj: string,
    description: string,
    email: string,
    password: string,
    city: string,
    state: string,
    causes: string[],
    areas: string[],
    skills: string[],
    preferredCauses: string[],
  ) {
    this.organizationName = organizationName;
    this.cnpj = cnpj;
    this.description = description;
    this.email = email;
    this.password = password;
    this.city = city;
    this.state = state;
    this.causes = causes;
    this.areas = areas;
    this.skills = skills;
    this.preferredCauses = preferredCauses;
  }
}
