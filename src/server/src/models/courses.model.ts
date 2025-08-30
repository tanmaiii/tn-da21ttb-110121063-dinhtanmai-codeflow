import { ENUM_TYPE_COURSE } from '@/data/enum';
import { Course } from '@/interfaces/courses.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { CourseDocumentModel } from './course_documents.model';
import { TagModel } from './tags.model';
import { UserModel } from './users.model';

export type CourseCreationAttributes = Optional<
  Course,
  | 'id'
  | 'title'
  | 'thumbnail'
  | 'description'
  | 'endDate'
  | 'startDate'
  | 'topicDeadline'
  | 'authorId'
  | 'status'
  | 'maxGroupMembers'
  | 'type'
  | 'password'
>;

export class CourseModel extends Model<Course, CourseCreationAttributes> implements Course {
  public id: string;
  public title: string;
  public thumbnail?: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public topicDeadline: Date;
  public regStartDate: Date;
  public regEndDate: Date;
  public authorId: string;
  public status: boolean;
  public maxGroupMembers: number;
  public type: string;
  public password: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CourseModel {
  CourseModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      thumbnail: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      startDate: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      endDate: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      regStartDate: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      regEndDate: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      topicDeadline: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      maxGroupMembers: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 3,
      },
      password: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      authorId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM(...Object.values(ENUM_TYPE_COURSE)),
        defaultValue: ENUM_TYPE_COURSE.ELECTIVE,
      },
    },
    {
      tableName: 'courses',
      modelName: 'courses',
      sequelize,
      timestamps: true,
      paranoid: true, // bật xóa mềm
      scopes: {
        withPassword: {
          attributes: {
            include: ['password'],
          },
        },
      },
      defaultScope: {
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: UserModel,
            as: 'author',
            attributes: ['id', 'name', 'username', 'role', 'avatar'], // Replace with actual attribute names of UserModel
          },
          {
            model: TagModel,
            as: 'tags',
            through: { attributes: [] },
          },
          {
            model: CourseDocumentModel,
            as: 'documents',
            attributes: ['id', 'title', 'url'], // Replace with actual attribute names of UserModel
          },
        ],
      },
    },
  );

  return CourseModel;
}
