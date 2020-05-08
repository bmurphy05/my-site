import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity("courses")
export class Course extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  title: string;

  @Field()
  @Column("text")
  semester: string;

  @Field()
  @Column("text")
  year: string;

  @ManyToOne(() => User)
  @JoinColumn()
  @Field(() => User)
  @Column("int")
  user!: number;
}
