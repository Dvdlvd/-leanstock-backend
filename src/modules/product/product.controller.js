import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateInventory
} from "./product.service.js";


// CREATE PRODUCT
export const createProduct = async (
  req,
  res,
  next
) => {

  try {

    const product =
      await create({
        ...req.body,
        tenantId: req.user.tenantId
      });

    res.json(product);

  } catch (error) {

    next(error);

  }

};


// GET ALL PRODUCTS
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

        page,
        limit,
        search,
        sortBy,
        order,

        tenantId:
          req.user.tenantId
      });

    res.json(products);

  } catch (error) {

    next(error);

  }

};


// GET ONE PRODUCT
export const getOne = async (
  req,
  res,
  next
) => {

  try {

    const product =
      await getById(req.params.id);

    res.json(product);

  } catch (error) {

    next(error);

  }

};


// UPDATE PRODUCT
export const update = async (
  req,
  res,
  next
) => {

  try {

    const product =
      await updateById(
        req.params.id,
        req.body
      );

    res.json(product);

  } catch (error) {

    next(error);

  }

};


// DELETE PRODUCT
export const remove = async (
  req,
  res,
  next
) => {

  try {

    await deleteById(req.params.id);

    res.json({
      message: "Deleted"
    });

  } catch (error) {

    next(error);

  }

};