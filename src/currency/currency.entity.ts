import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('currencies')
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  symbol: string;
}
