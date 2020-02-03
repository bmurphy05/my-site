import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Job extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Column()
  location: string;

  @Column()
  startDate: string;
  
  @Column()
  endDate: string;
  
  @Column()
  responsibilities: string;

  @Column()
  user: number;

}
