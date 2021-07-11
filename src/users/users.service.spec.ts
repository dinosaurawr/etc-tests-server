import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/users/user.model';
import { UserService } from './users.service';

describe('UsersService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get user by login', () => {
    const foundUser = service.findByLogin('test');
    expect(foundUser).toBeInstanceOf(User);
  });

  it('should return null for non existing login', () => {
    const nullUser = service.findByLogin('notExistingLogin');
    expect(nullUser).toBeNull();
  });
});
