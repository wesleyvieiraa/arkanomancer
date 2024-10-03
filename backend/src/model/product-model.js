class Product {
  constructor(dto) {
    this.productId = dto.product_id || dto.productId;
    this.name = dto.name || dto.name;
    this.unitTypeId = dto.unit_type_id || dto.unitTypeId;
    this.price = dto.price || dto.price;
    this.description = dto.description || dto.description;
    this.categoryId = dto.category_id || dto.categoryId;
    this.userId = dto.user_id || dto.userId;
    this.images = dto.images || null;
  }
}

module.exports = Product;
