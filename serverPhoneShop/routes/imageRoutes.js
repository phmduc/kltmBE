import express from "express";
import cloudinary from "cloudinary";
import asyncHandle from "express-async-handler";
import fs from "fs";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import path from "path";

const imgRouter = express.Router();

cloudinary.config({
  cloud_name: "dgw1cwtd1",
  api_key: "128858954148247",
  api_secret: "GSMdk1zkQI5L4d6roTUysuvk9LM",
});

imgRouter.post("/", async (req, res) => {
  try {
    const file = req.body.file;
    const promise = file.map(async (elem, index) => {
      return await cloudinary.v2.uploader.upload(
        elem,
        { folder: "test" },
        (err, result) => {
          if (err) throw err;
        }
      );
    });
    let images = await Promise.all(promise);
    res.json(images);
  } catch (err) {
    res.status(500).json("Oops, Error!");
  }
});
imgRouter.post("/destroy", async (req, res) => {
  try {
    const deletefile = req.body.publicId;
    console.log(deletefile);
    if (!deletefile) return res.status(400).json({ msg: "no images selected" });
    console.log(deletefile);
    cloudinary.v2.uploader.destroy(deletefile, async (err, result) => {
      if (err) throw err;
      res.json({ msg: "deleted image" });
    });
  } catch (err) {
    res.status(500).json("Oops, notfound");
  }
});

export default imgRouter;
