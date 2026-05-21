import {
  createProduct as createProductService,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  reserveProduct,
  getForecast
} from "./product.service.js";


// CREATE PRODUCT
export const createProduct = async (
  req,
  res,
  next
) => {

  try {

    const product =
      await createProductService(
        req.body,
        req.user.tenantId
      );

    res.json(product);

  } catch (error) {

    next(error);

  }

};


// GET PRODUCTS
export const getAllProducts = async (
  req,
  res,
  next
) => {

  try {

    const {
      page,
      limit,
      search,
      sortBy,
      order
    } = req.query;

    const products =
      await getProducts({

        tenantId:
          req.user.tenantId,

        page,
        limit,
        search,
        sortBy,
        order

      });

    res.json(products);

  } catch (error) {

    next(error);

  }

};


// GET ONE
export const getOne = async (
  req,
  res,
  next
) => {

  try {

    const product =
      await getProductById(
        req.params.id,
        req.user.tenantId
      );

    res.json(product);

  } catch (error) {

    next(error);

  }

};


// UPDATE
export const update = async (
  req,
  res,
  next
) => {

  try {

    const product =
     await updateProduct(
      req.params.id,
      req.body,
      req.user.tenantId,
      req.user.userId
    );

    res.json(product);

  } catch (error) {

    next(error);

  }

};


// DELETE
export const remove = async (
  req,
  res,
  next
) => {

  try {

    await deleteProduct(
      req.params.id,
      req.user.tenantId
    );

    res.json({
      message: "Deleted"
    });

  } catch (error) {

    next(error);

  }

};


// RESERVE
export const reserve = async (
  req,
  res,
  next
) => {

  try {

    const result =
      await reserveProduct(
        req.params.id,
        req.body.quantity
      );

    res.json(result);

  } catch (error) {

    next(error);

  }

};


// FORECAST
export const forecast = async (
  req,
  res,
  next
) => {

  try {

    const result =
      await getForecast(
        req.params.id,
        req.user.tenantId
      );

    res.json(result);

  } catch (error) {

    next(error);

  }

};