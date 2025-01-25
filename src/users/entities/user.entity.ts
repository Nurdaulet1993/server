import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'users'
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @Column()
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
}
