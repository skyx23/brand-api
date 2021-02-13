const { Brand, User, Subject, Course, SubBrand } = require('../schemas/schema');
const getData = async (req,res)=> {
    try {
      const sub_brand = await Brand.find().populate({path : 'sub_brand',populate : {path : 'user',populate : {path : 'subject'}}})
      
      res.send(sub_brand)
      
    } catch (error) {
      res.send(error)
    }
  }
module.exports = getData;