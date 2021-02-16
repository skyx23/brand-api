const { Brand, SubBrand } = require('../models/schema');
const isAdmin = (req) => {
  const admin = req.client.user.brand_name;
  if (!admin) {
    return res.send('you need to be admin to add users');
  }
};
const add_subbrand = async (req, res) => {
  try {
    isAdmin(req);
    const newSubBrand = new SubBrand({
      subBrand_name: req.body.subBrand_name,
      description: req.body.description,
    });
    const saved = await newSubBrand.save();
    await Brand.updateMany(
      { brand_name: req.client.user.brand_name },
      {
        $push: { sub_brand: saved._id },
      }
    );
    res.send(
      `${req.body.subBrand_name} add to ${req.client.user.brand_name} as a sub brand`
    );
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const update_subbrand = async (req, res) => {
  try {
    isAdmin(req);
    let updated ;
    if (!req.body.new_name) {
        console.log("1 true")
       updated = await SubBrand.updateOne(
        { subBrand_name: req.body.subBrand_name },
        { description: req.body.new_description }
      );
    } else if (!req.body.new_description) {
        console.log("2 true")
       updated = await SubBrand.updateOne(
        { subBrand_name: req.body.subBrand_name },
        { subBrand_name: req.body.new_name }
      );
    } else {
        console.log(" 3 true")
       updated = await SubBrand.updateOne(
        { subBrand_name: req.body.subBrand_name },
        {
          subBrand_name: req.body.new_name,
          description: req.body.new_description,
        }
      );
    }

    if (updated.nModified >= 1) {
      res.send('subbrand has been updated with the provided data');
    } else {
        console.log(updated)
      res.send('database could not be updated');
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const get_subbrand = async (req, res) => {
  try {
    isAdmin(req);
    const data = await SubBrand.find().populate('user');
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const delete_subbrand = async (req, res) => {
  try {
    isAdmin(req);
    const deleted = await SubBrand.deleteMany({
      subBrand_name: req.body.subBrand_name,
    });
    if (deleted) {
      return res.send('sub Brand has been deleted');
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const sub_brand = {
  add_subbrand,
  update_subbrand,
  get_subbrand,
  delete_subbrand,
};
module.exports = sub_brand;
