import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity, JoinColumn,
  OneToMany, OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Task} from "../../tasks/entities/task.entity";
import { Profile } from "../../profiles/entities/profile.entity";

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

  @OneToOne(
    () => Profile,
      profile => profile.user,
    { cascade: ["insert"] } // Because of cascade insert you do not need create a profile by yourself
  )
  @JoinColumn()
  profile?: Profile;
}
