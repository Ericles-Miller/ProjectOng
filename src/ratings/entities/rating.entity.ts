import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity('ratings')
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false })
  user: User;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @ManyToOne(() => Project, { nullable: true })
  project: Project;

  @Column({ type: 'uuid', nullable: true })
  projectId: string;

  @Column({ type: 'int', nullable: false })
  score: number; // 1-5

  @Column({ type: 'text', nullable: false })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  constructor(userId: string, score: number, comment: string, projectId: string) {
    this.userId = userId;
    this.projectId = projectId;
    this.score = score;
    this.comment = comment;
  }
}
