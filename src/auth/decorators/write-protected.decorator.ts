import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export const WriteProtected = () => applyDecorators(ApiBearerAuth());
