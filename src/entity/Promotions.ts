import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DBTable } from "~/constants/DBTable";
import { PromotionPhases } from "./PromotionPhases";

@Entity(DBTable.PROMOTIONS)
export class Promotions extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  @OneToMany(() => PromotionPhases, (phases) => phases.promotions)
  phases: PromotionPhases[];

  @Column({
    type: "int", // Tương ứng với kiểu dữ liệu INT trong PostgreSQL
    unique: true,
    nullable: false,
  })
  promotion_percent: number;
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
