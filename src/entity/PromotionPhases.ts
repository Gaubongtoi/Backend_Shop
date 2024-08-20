import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DBTable } from "~/constants/DBTable";
import { Promotions } from "./Promotions";
import { Products } from "./Products";

@Entity(DBTable.PROMOTION_PHASES)
export class PromotionPhases extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  @ManyToOne(() => Promotions, (promotions) => promotions.phases, {
    eager: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({
    name: "promotion_id",
  })
  promotions: Promotions;

  @OneToMany(() => Products, (products) => products.phases)
  products: Products[];

  @Column({
    type: "varchar",
    length: 70,
    nullable: false,
  })
  promotion_name: string;

  @Column({ type: "date", nullable: false })
  start_date: Date;

  @Column({ type: "date", nullable: false })
  end_date: Date;

  @Column({ type: "text", nullable: false })
  promotion_img: string;

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
