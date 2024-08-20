import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DBTable } from "~/constants/DBTable";
import { Users } from "./Users";

@Entity(DBTable.REFRESH_TOKENS)
export class RefreshTokens extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  @ManyToOne(() => Users, (users) => users.tokens, {
    eager: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({
    name: "user_id",
  })
  users: Users;

  @Column({
    type: "text",
    nullable: false,
  })
  token: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;
}
