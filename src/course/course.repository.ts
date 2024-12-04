import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "./entities/course.entity";
import { Repository } from "typeorm";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";

export class courseRepository {
    constructor(
        @InjectRepository(Course) private readonly courseRepository: Repository<Course>
    ) {
        
    }

    async create(createCourseDto: CreateCourseDto): Promise<Course> {
        const created = this.courseRepository.create(createCourseDto);
        return await this.courseRepository.save(created)
    }

    async findOne(id: number): Promise<Course> {
        return await this.courseRepository.findOne({where: {id}})
    }

    async findAll(): Promise<Course[]> {
        return await this.courseRepository.find({})
    }

    async update(id: number, updateCourseDto: UpdateCourseDto){
        return await this.courseRepository.update(id, updateCourseDto)
    }

    async remove(id: number) {
        return await this.courseRepository.softDelete(id)
    }
}