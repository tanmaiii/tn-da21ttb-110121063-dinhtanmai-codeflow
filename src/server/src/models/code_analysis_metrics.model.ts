import { CodeAnalysisMetrics } from '@/interfaces/code_analysis.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export type CodeAnalysisMetricsCreationAttributes = Optional<CodeAnalysisMetrics, 'codeAnalysisId' | 'name' | 'value' | 'bestValue'>;

export class CodeAnalysisMetricsModel extends Model<CodeAnalysisMetrics, CodeAnalysisMetricsCreationAttributes> implements CodeAnalysisMetrics {
  public codeAnalysisId!: string;
  public name!: string;
  public value!: string;
  public bestValue!: boolean;
}

export default function (sequelize: Sequelize): typeof CodeAnalysisMetricsModel {
  CodeAnalysisMetricsModel.init(
    {
      codeAnalysisId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'code_analysis',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      value: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      bestValue: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'CodeAnalysisMetrics',
      tableName: 'code_analysis_metrics',
      timestamps: false,
    },
  );
  return CodeAnalysisMetricsModel;
}
