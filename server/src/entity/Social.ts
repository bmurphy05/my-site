import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Social extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  linkedIn: string;

  @Field()
  @Column("text")
  github: string;

  @ManyToOne(() => User)
  @JoinColumn()
  @Field(() => User)
  @Column("int")
  user!: number;

}
