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

  @Field()
  @Column()
  location: string;

  @Field()
  @Column()
  startDate: string;
 
  @Field()
  @Column()
  endDate: string;
  
  @Field()
  @Column()
  responsibilities: string;

  @Field()
  @Column()
  user: number;

}
