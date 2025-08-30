import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

import { CourseDocument } from '@/interfaces/courses.interface';

export type CourseDocumentCreationAttributes = Optional<CourseDocument, 'id' | 'title' | 'url' | 'courseId'>;

export class CourseDocumentModel extends Model<CourseDocument, CourseDocumentCreationAttributes> implements CourseDocument {
  public id!: string;
  public url: string;
  public title: string;
  public courseId: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CourseDocumentModel {
  CourseDocumentModel.init(
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
      url: {
        allowNull: false,
        type: DataTypes.STRING(255),
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
      tableName: 'course_documents',
      modelName: 'course_documents',
      sequelize,
      timestamps: true,
      paranoid: true, // bật xóa mềm
    },
  );

  return CourseDocumentModel;
}
