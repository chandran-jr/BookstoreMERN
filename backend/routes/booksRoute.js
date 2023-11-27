import express from 'express';
import {Book} from '../models/bookModel.js'

const router = express.Router();

router.put('/:id',async(request, response) => {
    try {
      if(
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ){
        return response.status(404).send({message: 'Please enter all required fields'})
      }
      const {id} = request.params;
      const result = await Book.findByIdAndUpdate(id, request.body)
      if(!result) {
        return response.status(404).send({message: 'Book Not Found'})
      }
      return response.status(200).send({message:"Book successfully updated"})
    }
    catch(error) {
      console.log(error);
      return response.status(500).send({message: error})
    }
  })
  
  router.delete('/:id',async(request, response) =>{
    const {id} = request.params;
    try{
      const result = await Book.findByIdAndDelete(id);
      if(!result) {
        return response.status(404).send({message:'Book Not Found'})
      }
      return response.status(200).send({message: 'Book successfully deleted'})
    }
    catch(error) {
      console.log(error);
      return response.status(500).send({message: 'Some error occured'})
    }
  })

  router.post("/", async (request, response) => {
    try{
      if(
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ){
        return response.status(404).send({message: 'Please enter all required fields'})
      }
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear
      }
  
      const book = await Book.create(newBook)
      return response.status(200).send(book)
    }
    catch(error) {
      console.log(error);
      return response.status(500).send({message: error.message});
      }
  })
  
  router.get('/', async (req, res) => {
    try{
      const books = await Book.find({});
      return res.status(200).json({
        count: books.length,
        data: books
      })
    }
    catch(error) {
      console.log(error);
      return res.status(500).send({message: error.message});
    }
  })
  
  router.get('/:id', async (req, res) => {
    try{
      const {id} = req.params;
  
      const books = await Book.findById(id);
      return res.status(200).json(books)
    }
    catch(error) {
      console.log(error);
      return res.status(500).send({message: error.message});
    }
  })

  export default router