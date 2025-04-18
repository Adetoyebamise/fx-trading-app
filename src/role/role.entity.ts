import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from '../user/user.entity';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
