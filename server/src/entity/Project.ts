import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Project extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  title: string;

  @Field()
  @Column("text")
  startDate: string;
  
  @Field()
  @Column("text")
  endDate: string;

  @Field()
  @Column("text")
  description: string;
  
  @Field()
  @Column("text")
  link: string;

  @Field()
  @Column("text")
  github: string;

  @Field()
  @Column("int")
  user: number;
  
}
