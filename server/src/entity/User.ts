import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  firstName: string;

  @Field()
  @Column("text")
  lastName: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field()
  @Column("text")
  password: string;

  @Field()
  @Column("text")
  underGraduate: string;

  @Field()
  @Column("text")
  postGraduate: string;

  @Field()
  @Column("text")
  summary: string;

  @Field()
  @Column("text")
  image: string;

}
