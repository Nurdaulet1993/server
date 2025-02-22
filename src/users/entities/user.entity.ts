import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity, JoinTable, ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Task} from "../../tasks/entities/task.entity";
import { Role } from "../../roles/entities/role.entity";

@Entity({
  name: 'users'
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @Column({
    unique: true
  })
  email: string;

  @AfterInsert()
  afterInsert() {
    console.log(`User with ID ${this.email} has been created.`);
  }

  @AfterUpdate()
  afterUpdate() {
    console.log(`User with ID ${this.email} has been updated.`);
  }

  @AfterRemove()
  afterRemove() {
    console.log(`User with ID ${this.email} has been removed.`);
  }

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'users_roles',
  })  // Join table for many-to-many relationship with roles
  roles: Role[];
}
