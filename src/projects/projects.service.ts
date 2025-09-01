import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from 'src/enrollments/entities/enrollment.entity';
import { JoinProjectDto } from './dto/join-project.Dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private readonly projectsRepository: Repository<Project>,
    @InjectRepository(Enrollment) private readonly enrollmentsRepository: Repository<Enrollment>,
  ) {}

  async create(
    { title, description, location, cause, startDate, endDate, maxVolunteers }: CreateProjectDto,
    ngoId: string,
  ): Promise<Project> {
    try {
      const projectAlreadyExists = await this.projectsRepository.findOne({ where: { title } });

      if (projectAlreadyExists) {
        throw new BadRequestException('Project already exists');
      }

      const project = new Project(
        title,
        description,
        location,
        cause,
        startDate,
        endDate,
        maxVolunteers,
        ngoId,
      );

      return this.projectsRepository.save(project);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error creating project');
    }
  }

  async findAll(cause?: string, location?: string, status?: string): Promise<Project[]> {
    try {
      return await this.projectsRepository.find({
        where: { cause, location, status: status as 'open' | 'closed' | 'completed' },
      });
    } catch {
      throw new InternalServerErrorException('Error finding projects');
    }
  }

  async findOne(id: string): Promise<Project> {
    try {
      const project = await this.projectsRepository.findOne({ where: { id } });

      if (!project) {
        throw new NotFoundException('Project not found');
      }
      return project;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error finding project');
    }
  }

  async joinProject(volunteerId: string, { id, status, notes }: JoinProjectDto): Promise<void> {
    try {
      const project = await this.projectsRepository.findOne({ where: { id } });

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      if (project.status === 'closed') {
        throw new BadRequestException('Project is closed');
      }

      const enrollmentAlreadyExists = await this.enrollmentsRepository.findOne({
        where: { projectId: id, volunteerId },
      });

      if (enrollmentAlreadyExists) {
        throw new BadRequestException('Enrollment already exists');
      }

      if (status !== 'pending' && status !== 'approved' && status !== 'rejected') {
        throw new BadRequestException('Invalid status');
      }

      const enrollment = new Enrollment(project.id, volunteerId, status, notes);

      await this.enrollmentsRepository.save(enrollment);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error joining project');
    }
  }
}
