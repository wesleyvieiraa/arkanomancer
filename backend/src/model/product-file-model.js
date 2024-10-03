class ProductFile {
  constructor(dto) {
    this.productFileId = dto.product_file_id || dto.productFileId;
    this.productId = dto.product_id || dto.productId;
    this.userId = dto.user_id || dto.userId;
    this.externalId = dto.external_id || dto.externalId;
    this.name = dto.name;
  }
}

module.exports = ProductFile;
