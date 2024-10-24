import { Post } from 'src/posts/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 96,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 96,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 96,
    unique: true, //중복 없게
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 96,
  })
  password: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
