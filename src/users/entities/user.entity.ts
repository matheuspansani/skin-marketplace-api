import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Skin } from '../../skins/entities/skin.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nick: string;

  @Column({ default: 0 })
  saldo: number;

  @Column({ nullable: true })
  steamId: string;

  @OneToMany(() => Skin, (skin) => skin.dono)
  skins: Skin[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

}