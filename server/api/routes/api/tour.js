import tour from '../../controller/tour'
var express = require('express');
var router = express.Router();

// var multer = require('multer') // 
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'upload/');
//       },
//       filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//       }
// })
// // var upload = multer({ dest: 'uploadedFiles/' }); // 3-1
// var upload = multer({ storage: storage }); // 3-2

/* GET users listing. */
router.get('/', tour.getTourAll);
router.get('/select', tour.getTour);
router.post('/', tour.createTour);
router.put('/:id', tour.updateTour);
router.delete('/:id', tour.deleteTour);

module.exports = router;