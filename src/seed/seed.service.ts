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
        name: 'Category 1',
      },
      {
        name: 'Category 2',
      },
      {
        name: 'Category 3',
      },
      {
        name: 'Category 4',
      },
      {
        name: 'Category 5',
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
        username: 'user',
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
    const posts: Partial<Post>[] = [
      {
        title: 'Post 1',
        content: 'Content 1',
        userId: 1,
        categoryId: 1,
      },
      {
        title: 'Post 2',
        content: 'Content 2',
        userId: 2,
        categoryId: 2,
      },
      {
        title: 'Post 3',
        content: 'Content 3',
        userId: 3,
        categoryId: 3,
      },
      {
        title: 'Post 4',
        content: 'Content 4',
        userId: 4,
        categoryId: 4,
      },
    ];
    await this.clearTable('post');
    await this.postRepository.save(posts);
  }

  async seedComments() {
    const comments: Partial<Comment>[] = [
      {
        content: 'Comment 1',
        userId: 1,
        postId: 1,
      },
      {
        content: 'Comment 2',
        userId: 2,
        postId: 1,
      },
      {
        content: 'Comment 3',
        userId: 3,
        postId: 2,
      },
      {
        content: 'Comment 4',
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
