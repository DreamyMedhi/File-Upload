import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    name: {type: String}
})

export const TestDB =  mongoose.model('Test', testSchema)

const fileSchema = new mongoose.Schema({
    name: String,
    file: Buffer,
    author: String,
  });

export const FileDB = mongoose.model('File', fileSchema)