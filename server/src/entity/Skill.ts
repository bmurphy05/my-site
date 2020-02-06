import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, ManyToOne } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Skill extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  title: string;

  @Field()
  @Column("text")
  type: string;

  @ManyToOne(() => User)
  @JoinColumn()
  @Field(() => User)
  @Column("int")
  user!: number;
  
}
