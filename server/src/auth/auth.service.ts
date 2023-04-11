import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';
import * as uuid from 'uuid';

import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt'

import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RefreshDto } from './dto/refresh.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from './schemas/refresh-token.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) throw new HttpException('Invalid email or password', HttpStatus.BAD_REQUEST);
    const isPasswordValid = await compareSync(loginDto.password, user.hashed_password);
    if (!isPasswordValid) throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);

    const tokensPair = await this.generatePair(user);
    await user.save()

    return tokensPair;
  }

  async signup(signupDto: SignUpDto) {

    const foundUser = await this.userService.findByEmail(signupDto.email);
    if (foundUser) throw new HttpException('A user with this email already exists', HttpStatus.BAD_REQUEST);

    const hashedPassword = hashSync(signupDto.password, 5);

    const createUserDto = {
      username: signupDto.username,
      email: signupDto.email,
      hashed_password: hashedPassword,
    } as CreateUserDto
    const user = await this.userService.create(createUserDto);

    const tokensPair = await this.generatePair(user);
    await user.save();

    return tokensPair;
  }

  async refresh(refreshDto: RefreshDto) {
    const refreshToken = refreshDto.refresh_token;

    const user = await this.deleteOldRefreshToken(refreshToken);
    if (!user) throw new UnauthorizedException;
    return await this.generatePair(user);
  }

  async logout(req) {
    const user = await this.userService.findById(req['user'].sub);
    await this.refreshTokenModel.deleteMany({user});
    return HttpStatus.OK;
  }

  async generatePair(user) {
    const payload = {sub: user.id, email: user.email, username: user.username};

    const refreshToken = await this.refreshTokenModel.create({value: uuid.v4(), user});
    const accessToken = await this.jwtService.signAsync(payload);

    return {refreshToken: refreshToken.value, accessToken};
  }

  async deleteOldRefreshToken(token: string) {
    const tokenDocument = await this.refreshTokenModel.findOneAndRemove({value: token});
    if (!tokenDocument) return undefined;

    return tokenDocument.user;
  }


}
