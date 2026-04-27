import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
  } from "./product.service.js";
  
  import {
    createProductSchema,
    updateProductSchema
  } from "./product.validator.js";
  
  export const create = async (req, res, next) => {
    try {
      const data = createProductSchema.parse(req.body);
  
      const product = await createProduct(data, req.user.tenantId);
  
      res.json(product);
    } catch (err) {
      next(err);
    }
  };
  
  export const getAll = async (req, res, next) => {
    try {
      const products = await getProducts(req.user.tenantId);
  
      res.json(products);
    } catch (err) {
      next(err);
    }
  };
  
  export const getOne = async (req, res, next) => {
    try {
      const product = await getProductById(
        req.params.id,
        req.user.tenantId
      );
  
      res.json(product);
    } catch (err) {
      next(err);
    }
  };
  
  export const update = async (req, res, next) => {
    try {
      const data = updateProductSchema.parse(req.body);
  
      const product = await updateProduct(
        req.params.id,
        data,
        req.user.tenantId
      );
  
      res.json(product);
    } catch (err) {
      next(err);
    }
  };
  
  export const remove = async (req, res, next) => {
    try {
      await deleteProduct(req.params.id, req.user.tenantId);
  
      res.json({ message: "Deleted" });
    } catch (err) {
      next(err);
    }
  };