import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, UpdateDateColumn } from "typeorm";
import User from "./User.typeorm";

@Entity("social_medias")
export default class SocialMedias {
  @Column({ primary: true, unique: true })
  id!: string;

  @Column({ nullable: true })
  facebook!: string;

  @Column({ nullable: true })
  twitter!: string;

  @Column({ nullable: true })
  instagram!: string;

  @Column({ nullable: true })
  youtube!: string;

  @Column({ nullable: true })
  linkedin!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: "user_id" })
  User!: User;
}
