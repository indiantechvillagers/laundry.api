const models = require("../../models");

const addresseService = {
  add: async (payload) => {
    try {
      // Create admin record in the database
      const data = await models.Addresses.create(payload);
      // return admin;
      return data;
    } catch (error) {
      // Handle any errors that occur during database operation
      throw new Error("Failed to add");
    }
  },
  getAll: async () => {
    try {
      const data = await models.Addresses.findAll({
        // where: {
        //   isActive: true,
        //   isDeleted: false,
        // },
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  update: async (id, paylod) => {
    try {
      // Create admin record in the database
      const [rowsAffected, updatedData] = await models.Addresses.update(
        paylod,
        {
          where: {
            addressId: id
          },
        }
      );

      if (rowsAffected > 0) {
        return "Data updated successfully";
      } else {
        return "No data found matching the condition";
      }
    } catch (error) {
      console.log(error);
      // Handle any errors that occur during database operation
      throw new Error("Failed to update");
    }
  },
  delete: async (id) => {
    try {
      // Create admin record in the database
      const [rowsAffected, updatedData] = await models.Addresses.update(
        { isDeleted: true },
        {
          where: {
            addressId: id
          },
        }
      );

      if (rowsAffected > 0) {
        return "Data deleted successfully";
      } else {
        return "No data found matching the condition";
      }
    } catch (error) {
      throw new Error("Failed to delete data");
    }
  },
  get: async (id) => {
    try {
      console.log(id);
      const data = await models.Addresses.findOne({
        where: {
          addressId: id,
          // isActive: true,
          // isDeleted: false,
        },
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = addresseService;
