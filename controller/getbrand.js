const { Brand, User, Subject, Course, SubBrand } = require('../models/schema');
const getbrand = async (req, res) => {
    try {
        const brand = await Brand.findOne({brand_name : req.body.brand_name})
        if (brand) {
            return res.send('brand already exists')
        }else{
            res.send('not such brand with same exists')
        }
    } catch (error) {
        res.send(error)
    }
}
module.exports = getbrand;