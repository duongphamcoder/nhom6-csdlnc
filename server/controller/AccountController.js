const bcrypt = require("bcrypt");
const saltRounds = 10;

const Account = require("../models/account");

class AccountController {
  updateAccountById(id, Obj) {
    return Account.updateOne({ _id: id }, { ...Obj });
  }

  // chức năng đăng nhập(user)
  async handle_login(req, res) {
    try {
      const account = await Account.findOne({ username: req.body.username });
      if (Boolean(account)) {
        const compare = await bcrypt.compare(
          req.body.password,
          account.password
        );
        return res.json({
          err: false,
          account,
          mess: "Login successfully !!",
        });
      }
      return res.json({
        err: true,
        mess: "Username or Password Incorrect !!",
        account: {},
      });
    } catch (error) {
      console.log(error);
      return res.json({
        err: true,
        mess: "There was an error during the check !!",
        account: {},
      });
    }
  }

  // chức năng đăng ký
  async handle_register(req, res) {
    try {
      const query = await Account.findOne({ username: req.body.username });
      if (Boolean(query)) {
        return res.json({
          err: true,
          mess: "Account already exists !!!",
          account: {},
        });
      } else {
        const new_password = await bcrypt.hash(req.body.password, saltRounds);
        const account = new Account({
          ...req.body,
          password: new_password,
        });
        account.save();
        return res.json({
          err: false,
          mess: "Register success !!!",
          account,
        });
      }
    } catch (error) {
      console.log(error);
      return res.json({
        err: true,
        mess: "There was an error during the check !!!",
        account: {},
      });
    }
  }

  // lấy ra thông tin tất cả tài khoản (trang admin)
  getAllAccount() {
    return Account.find({ role: "USER_ROLE" });
  }

  // lấy ra thông tin của người dùng theo id
  getAccountById(id) {
    return Account.findById(id);
  }
}

module.exports = new AccountController();
