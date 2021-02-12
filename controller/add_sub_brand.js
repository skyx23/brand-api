const { Brand, SubBrand } = require('../schemas/schema');
const add_sub_brand = async (req, res) => {
  try {
    const admin = await Brand.findOne({ _id: req.client._id });
    if (!admin) {
      return res.send('you need to be admin to add users');
    }
    const newSubBrand = new SubBrand({
      subBrand_name: req.body.subBrand_name,
      description: req.body.description,
    });
    const saved = await newSubBrand.save();
    await Brand.updateMany(
      { brand_name: admin.brand_name },
      {
        $push: { sub_brand: saved._id },
      }
    );
    res.send(`${req.body.subBrand_name} add to ${admin.brand_name} as a sub brand`)
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
module.exports = add_sub_brand;
