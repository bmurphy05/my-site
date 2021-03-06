import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";

@ObjectType()
@Entity("users")
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
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field()
  @Column("text")
  password: string;
  
  @Column("bool", { default: false })
  confirmed: boolean;

  @Column("bool", { default: false })
  forgotPassword: boolean;

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
