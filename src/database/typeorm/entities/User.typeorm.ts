import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity("users")
export default class User {
  @Column({ primary: true, unique: true })
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  phone!: string;

  @Column()
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
