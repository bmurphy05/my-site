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

  @Column()
  description: string;

  @Column()
  startDate: string;
  
  @Column()
  endDate: string;
  
  @Column()
  link: string;

  @Column()
  github: string;

  @Column()
  user: number;
  
}
