import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('currencies')
@Unique(['code'])
export class Currency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  symbol: string;
}
