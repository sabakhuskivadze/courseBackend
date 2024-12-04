import { UserRole } from "src/enum/role.enum"
import { Rule } from "src/rules/entities/rule.entity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    username:string

    @Column()
    email:string

    @Column()
    phoneNumber:string

    @Column()
    password:string

    @Column()
    confirmPassword:string
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.Student,
      })
      role: UserRole;

      @ManyToOne(() => Rule, (rule) => rule.users)
      rules:Rule[]
}
