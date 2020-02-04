import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Project extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  startDate: string;
  
  @Field()
  @Column()
  endDate: string;
  
  @Field()
  @Column()
  link: string;

  @Field()
  @Column()
  github: string;

  @Field()
  @Column()
  user: number;
  
}
