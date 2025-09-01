import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity('enrollments')
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false })
  volunteer: User;

  @Column({ type: 'uuid', nullable: false })
  volunteerId: string;

  @ManyToOne(() => Project, { nullable: false })
  project: Project;

  @Column({ type: 'uuid', nullable: false })
  projectId: string;

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status: 'pending' | 'approved' | 'rejected' | 'completed';

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(projectId: string, volunteerId: string, status: string, notes?: string) {
    this.projectId = projectId;
    this.volunteerId = volunteerId;
    this.status = status as 'pending' | 'approved' | 'rejected' | 'completed';
    this.notes = notes || '';
  }
}
