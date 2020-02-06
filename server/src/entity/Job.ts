import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, ManyToOne } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Job extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  title: string;

  @Field()
  @Column("text")
  location: string;

  @Field()
  @Column("text")
  startDate: string;
 
  @Field()
  @Column("text")
  endDate: string;
  
  @Field()
  @Column("text")
  responsibilities: string;

  @ManyToOne(() => User)
  @JoinColumn()
  @Field(() => User)
  @Column("int")
  user!: number;
}
