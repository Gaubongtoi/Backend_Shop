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
import { Categories } from "./Categories";
import { Genders } from "~/constants/Genders";
import { Inventory } from "./Inventory";

@Entity(DBTable.SIZES)
export class Sizes extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  @ManyToOne(() => Categories, (categories) => categories.sizes, {
    eager: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({
    name: "category_id",
  })
  categories: Categories;

  @OneToMany(() => Inventory, (inventory) => inventory.sizes)
  inventory: Inventory[];

  @Column({
    type: "varchar",
    length: 100,
  })
  size_name: string;

  @Column({
    type: "enum",
    enum: Genders,
    default: Genders.MALE,
  })
  gender_type: Genders;

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
