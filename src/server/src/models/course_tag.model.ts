import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { CourseTag } from '@/interfaces/tags.interface';

export type CourseTagCreationAttributes = Optional<CourseTag, 'id' | 'tagId' | 'courseId'>;

export class CourseTagModel extends Model<CourseTag, CourseTagCreationAttributes> implements CourseTag {
  public id!: string;
  public tagId: string;
  public courseId: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CourseTagModel {
  CourseTagModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      tagId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'tags',
          key: 'id',
        },
      },
      courseId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'courses',
          key: 'id',
        },
      },
    },
    {
      tableName: 'course_tags',
      modelName: 'course_tags',
      sequelize,
      timestamps: true,
      paranoid: true, // bật xóa mềm
    },
  );

  return CourseTagModel;
}
