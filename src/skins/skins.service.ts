import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateSkinDto } from './dto/create-skin.dto';
import { UpdateSkinDto } from './dto/update-skin.dto';
import { Skin } from './entities/skin.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SkinsService {
  constructor(
    @InjectRepository(Skin)
    private skinsRepository: Repository<Skin>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async create(createSkinDto: CreateSkinDto): Promise<Skin> {
    const skin = this.skinsRepository.create(createSkinDto);
    
    if (createSkinDto.donoId) {
      const dono = await this.usersRepository.findOne({
        where: { id: createSkinDto.donoId },
      });
      
      if (!dono) {
        throw new NotFoundException(`Usuário com ID ${createSkinDto.donoId} não encontrado`);
      }
      
      skin.dono = dono;
    }
    
    return await this.skinsRepository.save(skin);
  }

  async findAll(): Promise<Skin[]> {
    return await this.skinsRepository.find({ relations: ['dono'] });
  }

  async findOne(id: number): Promise<Skin> {
    const skin = await this.skinsRepository.findOne({
      where: { id },
      relations: ['dono'],
    });
    
    if (!skin) {
      throw new NotFoundException(`Skin com ID ${id} não encontrada`);
    }
    
    return skin;
  }

  async update(id: number, updateSkinDto: UpdateSkinDto): Promise<Skin> {
    const skin = await this.findOne(id);
    
    if (updateSkinDto.donoId !== undefined) {
      if (updateSkinDto.donoId === null) {
        throw new BadRequestException('Uma skin não pode ficar sem dono');
      } else {
        const dono = await this.usersRepository.findOne({
          where: { id: updateSkinDto.donoId },
        });
        
        if (!dono) {
          throw new NotFoundException(`Usuário com ID ${updateSkinDto.donoId} não encontrado`);
        }
        
        skin.dono = dono;
      }
      
      delete updateSkinDto.donoId;
    }
    
    this.skinsRepository.merge(skin, updateSkinDto);
    
    return await this.skinsRepository.save(skin);
  }

  async remove(id: number): Promise<void> {
    const skin = await this.findOne(id);
    await this.skinsRepository.remove(skin);
  }

  async comprar(id: number, userId: number): Promise<Skin> {
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      const skin = await queryRunner.manager.findOne(Skin, {
        where: { id },
        relations: ['dono'],
      });
      
      if (!skin) {
        throw new NotFoundException(`Skin com ID ${id} não encontrada`);
      }
      
      if (skin.dono && skin.dono.id === userId) {
        throw new BadRequestException('Você já é o dono desta skin');
      }
      
      const user = await queryRunner.manager.findOne(User, {
        where: { id: userId },
      });
      
      if (!user) {
        throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
      }
      
      if (user.saldo < +skin.valor) {
        throw new BadRequestException(`Saldo insuficiente. Você tem R$${user.saldo} e a skin custa R$${skin.valor}`);
      }
      
      user.saldo -= +skin.valor;
      await queryRunner.manager.save(user);
      
      skin.dono = user;
      const skinAtualizada = await queryRunner.manager.save(skin);
      
      await queryRunner.commitTransaction();
      
      return skinAtualizada;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}