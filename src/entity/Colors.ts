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
import { Inventory } from "./Inventory";

@Entity(DBTable.COLORS)
export class Colors extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  @Column({
    type: "varchar",
    length: 40,
    nullable: false,
  })
  hex_code: string;

  @OneToMany(() => Inventory, (inventory) => inventory.colors)
  inventory: Inventory[];

  // @OneToMany(() => ProductImgs, (imgs) => imgs.colors)
  // product_imgs: ProductImgs[]

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
