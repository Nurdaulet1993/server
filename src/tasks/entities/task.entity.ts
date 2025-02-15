import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User} from "../../users/entities/user.entity";

@Entity({
  name: 'tasks'
})
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user: User) => user.tasks)
  user: User;
}
