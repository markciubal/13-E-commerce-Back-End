const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    /* id
    Integer.
    Doesn't allow null values.
    Set as primary key.
    Uses auto increment. */
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    /* product_id
    Integer.
    References the Product model's id. */
    product_id: {
      allowNull: false,
      references: {
        model: 'product',
        key: 'id',
      },
    },
    /*tag_id
    Integer.
    References the Tag model's id. */
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id',
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
