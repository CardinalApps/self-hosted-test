import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { User } from '../user/user.entity'

/**
 * Grants are given to users to give them permission to do things.
 */
@Entity()
export class Grant {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.grants, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User

  @Column()
  value: string
}
