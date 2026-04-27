import {
    createLocation,
    getLocations,
    getLocationById,
    updateLocation,
    deleteLocation
  } from "./location.service.js";
  
  import {
    createLocationSchema,
    updateLocationSchema
  } from "./location.validator.js";
  
  export const create = async (req, res, next) => {
    try {
      const data = createLocationSchema.parse(req.body);
  
      const location = await createLocation(data, req.user.tenantId);
  
      res.json(location);
    } catch (err) {
      next(err);
    }
  };
  
  export const getAll = async (req, res, next) => {
    try {
      const locations = await getLocations(req.user.tenantId);
  
      res.json(locations);
    } catch (err) {
      next(err);
    }
  };
  
  export const getOne = async (req, res, next) => {
    try {
      const location = await getLocationById(
        req.params.id,
        req.user.tenantId
      );
  
      res.json(location);
    } catch (err) {
      next(err);
    }
  };
  
  export const update = async (req, res, next) => {
    try {
      const data = updateLocationSchema.parse(req.body);
  
      const location = await updateLocation(
        req.params.id,
        data,
        req.user.tenantId
      );
  
      res.json(location);
    } catch (err) {
      next(err);
    }
  };
  
  export const remove = async (req, res, next) => {
    try {
      await deleteLocation(req.params.id, req.user.tenantId);
  
      res.json({ message: "Deleted" });
    } catch (err) {
      next(err);
    }
  };