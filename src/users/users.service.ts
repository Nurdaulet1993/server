import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository} from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { ProfilesService } from "../profiles/profiles.service";

@Injectable()
export class UsersService {
  constructor(
   @InjectRepository(User)
   private userRepo: Repository<User>,
   private profilesService: ProfilesService
  ) {}
  async create(createUserDto: CreateUserDto) {
    // Creating profile
    createUserDto.profile = createUserDto.profile ?? {};
    // const profile = await this.profilesService.create(createUserDto.profile);
    // Creating user
    const user = this.userRepo.create(createUserDto);
    // Adding profile to user
    // user.profile = profile; // We do not need this because of cascade
    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOne({
      where: { id }
    })
  }

  findByEmail(email: string): Promise<User[]> {
    return this.userRepo.find({
      where: { email }
    })
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({
      where: { email }
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, updateUserDto);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return this.userRepo.remove(user);
  }
}
