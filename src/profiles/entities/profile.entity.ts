import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity({
  name: 'profiles'
})
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true
  })
  name: string;

  @Column({
    nullable: true
  })
  phone: string;

  @OneToOne(() => User, user => user.profile, { nullable: true })
  user: User;
}
