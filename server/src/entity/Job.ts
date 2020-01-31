import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";

@ObjectType()
@Entity()
export class Job extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Column()
  jobTitle: string;

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
