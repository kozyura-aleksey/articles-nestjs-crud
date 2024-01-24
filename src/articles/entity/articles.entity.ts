import { User } from 'src/users/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'articles',
})
export class Article {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'varchar', nullable: false, default: null })
  title: string;
  @Column({ type: 'varchar', nullable: false, default: null })
  description: string;
  @Column({ type: 'date', nullable: true, default: null })
  date_published: Date;
  @Column({ type: 'number', nullable: false, default: null })
  author_id: number;
  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn({ name: 'author_id' })
  author: User;
}
