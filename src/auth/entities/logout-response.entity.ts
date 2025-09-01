import { ApiProperty } from '@nestjs/swagger';

export class LogoutResponseEntity {
  @ApiProperty({ example: 'Logout successful' })
  message: string;
}
