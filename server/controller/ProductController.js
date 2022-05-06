const Product = require("../models/product");
const Classify = require("../models/classify");

class ProductController {
  //update lai một trường dữ liệu trong sản phẩm
  updateProduct(id, Obj) {
    return Product.updateOne({ _id: id }, { ...Obj });
  }

  //lấy ra sản phẩm theo id
  getProductById(id) {
    return Product.findById(id);
  }

  // kiểm tra thương hiệu đó có tồn tại không
  checkClassify(classify) {
    return Classify.findOne({ name: classify }).then((data) => {
      if (Boolean(data)) {
        return false;
      }
      return true;
    });
  }

  // lấy ra tất cả sản phẩm của thương hiệu bất kỳ
  async getProductByClassify(classify, check1 = false) {
    const check = await this.checkClassify(classify);
    if (!check) {
      const data = !check1
        ? await Product.find({ classify }).limit(3)
        : await Product.find({ classify });
      return {
        err: false,
        data,
      };
    }
    return {
      err: true,
      data: [],
    };
  }

  // lấy dữ liệu trang home
  async getHome(limit_product) {
    // lấy ra tất những thương có trong database
    const arr = await Classify.find();
    const classifys = arr.map((item) => item.name);

    // thực hiện gọi hàm để lấy ra những sản phẩm theo
    // thương hiệu
    const promises = classifys.map((item) => this.getProductByClassify(item));
    return Promise.all(promises);
  }
}

module.exports = new ProductController();
