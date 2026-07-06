const jsonServer = require('json-server');
const multer = require('multer');
const path = require('path');
const express = require('express');

const server = jsonServer.create();
const router = jsonServer.router('wards.json');
const middlewares = jsonServer.defaults();

// Configure where to save uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file uniquely
  }
});

const upload = multer({ storage: storage });

// Apply default json-server middlewares (logger, static, cors)
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Serve the uploaded files statically so they are accessible via URL
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));
server.use(jsonServer.defaults({ static: path.join(__dirname, 'public') }));

// Custom Route for File Uploads
server.post('/upload-file', upload.single('file'), (req, res) => {
	console.log('upload route hit.')
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Generate a URL path for the file
  const fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;

  // OPTIONAL: Automatically save the file reference link to db.json
  const db = router.db; // Access lowdb instance
  const newRecord = {
    id: Date.now(),
    fileName: req.file.originalname,
    url: fileUrl,
    uploadedAt: new Date()
  };

  db.get('files').push(newRecord).write();

  // Return the record back to the client
  res.status(201).json(newRecord);
});

// Use standard router for all other endpoints
server.use('/api', router);

server.listen(4000, () => {
  console.log('JSON Server with Upload functionality is running on port 3000');
});
