import { AfterInsert, AfterRemove, AfterUpdate, BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
