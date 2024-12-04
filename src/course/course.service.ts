import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { courseRepository } from './course.repository';
import { CourseResponseDto } from 'list/course/course.dto';

@Injectable()
export class CourseService {

  constructor(
    private readonly courseRepository: courseRepository
  ) {

  }

  async create(createCourseDto: CreateCourseDto): Promise<CourseResponseDto> {
    return await this.courseRepository.create(createCourseDto);
  }

  async findAll(): Promise<CourseResponseDto[]> {
    const data = await this.courseRepository.findAll();
    return data;
  }

  async findOne(id: number): Promise<CourseResponseDto> {
    try {
      const data = await this.courseRepository.findOne(id);
      if(!data) {
        throw new Error('course id not found')
      }

      return data;
    } catch(err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }

    
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    try {
      const data = await this.courseRepository.update(id, updateCourseDto);
      if(!data) {
        throw new Error('course id not found')
      }

      return data;
    } catch(err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const data = await this.courseRepository.remove(id);
      if(!data) {
        throw new Error('course id not found')
      }

      return data;
    } catch(err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
