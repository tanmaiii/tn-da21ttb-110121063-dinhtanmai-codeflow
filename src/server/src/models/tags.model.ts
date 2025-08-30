import { Tag } from '@/interfaces/tags.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

type TagCreationAttributes = Optional<Tag, 'id' | 'name' | 'description'>;

export class TagModel extends Model<Tag, TagCreationAttributes> implements Tag {
  public id!: string;
  public name!: string;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly deleteAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof TagModel {
  TagModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      tableName: 'tags',
      modelName: 'tags',
      timestamps: true,
      paranoid: true, // bật xóa mềm
    },
  );
  return TagModel;
}
