import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Charlie Davis',
      email: 'charlie@example.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Diana Lee',
      email: 'diana@example.com',
      role: 'ADMIN',
    },
    {
      id: 5,
      name: 'Ethan Clark',
      email: 'ethan@example.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'ADMIN' | 'INTERN' | 'ENGINEER') {
    if (role) {
      const roleArray = this.users.filter((user) => user.role === role);
      if (roleArray.length === 0) {
        throw new NotFoundException('No users found with this role');
      }
      return roleArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.filter((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removeUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removeUser;
  }
}
