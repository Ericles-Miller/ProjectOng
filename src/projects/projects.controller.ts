import { Controller, Get, Post, Body, Param, Query, UseGuards, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { NgoAuthGuard } from '../auth/ngo-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
@ApiTags('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(NgoAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new volunteer project (ONG only)' })
  @ApiResponse({ status: 201, description: 'Project created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Only NGOs can create projects' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<Project> {
    const ngoId = user.sub;
    return await this.projectsService.create(createProjectDto, ngoId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects with optional filters' })
  @ApiQuery({ name: 'cause', required: false, description: 'Filter by cause type' })
  @ApiQuery({ name: 'location', required: false, description: 'Filter by location' })
  @ApiQuery({ name: 'status', required: false, description: 'Filter by status' })
  @ApiResponse({ status: 200, description: 'Projects fetched successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findAll(
    @Query('cause') cause?: string,
    @Query('location') location?: string,
    @Query('status') status?: string,
  ): Promise<Project[]> {
    return await this.projectsService.findAll(cause, location, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by id' })
  @ApiResponse({ status: 200, description: 'Project fetched successfully' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findOne(@Param('id') id: string): Promise<Project> {
    return await this.projectsService.findOne(id);
  }

  @Post(':id/join')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Join a project (volunteer only)' })
  @ApiResponse({ status: 201, description: 'Successfully joined project' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - Only volunteers can join projects' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiQuery({ name: 'status', required: false, description: 'Status of the enrollment' })
  @ApiQuery({ name: 'notes', required: false, description: 'Notes of the enrollment' })
  async joinProject(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
    @Query('status') status: string,
    @Query('notes') notes?: string,
  ): Promise<void> {
    if (user.userType !== 'volunteer') {
      throw new ForbiddenException('Only volunteers can join projects');
    }
    await this.projectsService.joinProject(id, user.sub, status, notes);
  }
}
