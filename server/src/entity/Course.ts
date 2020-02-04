import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Course extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  semester: string;

  @Field()
  @Column("text")
  title: string;

  @Field()
  @Column("int")
  user: number;

  @Field()
  @Column("text")
  year: string;
}
