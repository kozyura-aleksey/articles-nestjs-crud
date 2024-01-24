import { Article } from 'src/articles/entity/articles.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'varchar', nullable: true, default: null })
  name: string;
  @Column({ type: 'varchar', nullable: false, default: null })
  email: string;
  @Column({ type: 'varchar', nullable: false, default: null })
  password: string;
  @OneToMany(() => Article, (article) => article.author, {
    cascade: true,
  })
  articles: Article[];
}
