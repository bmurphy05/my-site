import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column("bool", { default: false })
  confirmed: boolean;

  @Column()
  undergraduate: string;

  @Column()
  postgraduate: string;

  @Column()
  summary: string;

  @Column()
  image: File;

  @Column()
  linkedIn: string;

  @Column()
  github: string;

  @Column()
  user: string;

}
