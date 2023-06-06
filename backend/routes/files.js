const filesRouter = require('express').Router()
const filesController = require('../controllers/files')

// Get list of files
filesRouter.get('/list', async (_, res) => {
  try {
    const files = await filesController.getList();
    if(!files) {
      res.status(404).send('Files not found')
      return
    };
    res.status(200).json(files);
  } catch (error) {
    res.status(500).send('Something went wrong')
  }
})

// Get a single file or all files
filesRouter.get('/data', async (req, res) => {
  try {
    const { fileName } = req.query
    if(!fileName) {
      const files = await filesController.getFiles()
      res.status(200).json(files)
      return
    }
    const file = await filesController.getFile(fileName)
    if(!file) {
      res.status(404).send('File not found')
      return
    }
    res.status(200).json(file);
  } catch (error) {
    res.status(500).send('Something went wrong')
  }
})

module.exports = filesRouter
