import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, Comment, Post, User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async run() {
    console.log('🚀 Running Seeder...');
    await this.category();
    await this.seedUsers();
    await this.seedPosts();
    await this.seedComments();
    console.log('✅ Seeding Complete!');
  }

  async category() {
    const categories: Partial<Category>[] = [
      {
        name: 'History',
      },
      {
        name: 'Food',
      },
      {
        name: 'Pets',
      },
      {
        name: 'Fashion',
      },
      {
        name: 'Exercise',
      },
      {
        name: 'Others',
      },
    ];
    await this.clearTable('category');
    await this.categoryRepository.save(categories);
  }

  async seedUsers() {
    const users: Partial<User>[] = [
      {
        username: 'admin',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      {
        username: 'user1',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      {
        username: 'user2',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
      {
        username: 'user3',
        avatar: 'https://i.pravatar.cc/150?img=4',
      },
      {
        username: 'user4',
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
      {
        username: 'user5',
        avatar: 'https://i.pravatar.cc/150?img=6',
      },
    ];
    await this.clearTable('user');
    await this.userRepository.save(users);
  }

  async seedPosts() {
    const exampleContent =
      'Tall, athletic, handsome with cerulean eyes, he was the kind of hyper-ambitious kid other kids loved to hate and just the type to make a big wager with no margin for error. But on the night before the S.A.T., his father took pity on him and canceled the bet. “I would’ve lost it,” Ackman concedes. He got a 780 on the verbal and a 750 on the math. “One wrong on the verbal, three wrong on the math,” he muses. “I’m still convinced some of the questions were wrong.”';
    const posts: Partial<Post>[] = [
      {
        title: 'The Big Short War',
        content: exampleContent,
        userId: 1,
        categoryId: 1,
      },
      {
        title: 'The Beginning of the End of the World',
        content: exampleContent,
        userId: 2,
        categoryId: 2,
      },
      {
        title: 'The Mental Health Benefits of Exercise',
        content: exampleContent,
        userId: 3,
        categoryId: 3,
      },
      {
        title: 'What Makes a Man Betray His Country?',
        content: exampleContent,
        userId: 4,
        categoryId: 4,
      },
    ];
    await this.clearTable('post');
    await this.postRepository.save(posts);
  }

  async seedComments() {
    const exampleComment = `Lorem ipsum dolor sit amet consectetur. Purus cursus vel est a pretium quam imperdiet. Tristique auctor sed semper nibh odio iaculis sed aliquet. Amet mollis eget morbi feugiat mi risus eu. Tortor sed sagittis convallis auctor.`;
    const comments: Partial<Comment>[] = [
      {
        content: exampleComment,
        userId: 1,
        postId: 1,
      },
      {
        content: exampleComment,
        userId: 2,
        postId: 1,
      },
      {
        content: exampleComment,
        userId: 3,
        postId: 2,
      },
      {
        content: exampleComment,
        userId: 4,
        postId: 2,
      },
    ];
    await this.clearTable('comment');
    await this.commentRepository.save(comments);
  }

  protected async clearTable(table) {
    await this.userRepository.query(
      `TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE;`,
    );
    console.log(`⚠️ All ${table} have been deleted (TRUNCATE)`);
  }
}
