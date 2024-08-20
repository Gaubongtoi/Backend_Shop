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

@Entity(DBTable.SUPPLIERS)
export class Suppliers extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: string;

  @OneToMany(() => Inventory, (inventory) => inventory.suppliers)
  inventory: Inventory[];

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  supplier_name: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  contact_name: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  contact_email: string;

  @Column({
    type: "varchar",
    length: 20,
  })
  contact_phone: string;

  @Column({
    type: "text",
    default: "",
  })
  address: string;

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
