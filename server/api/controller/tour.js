import db from '../middleware/db'
import httpStatus from 'http-status-codes'
import security from '../middleware/security'

// 게시글 전체 조회
async function getTourAll (req, res) {
    console.log(req.query);

    let lat = req.query.lat;
    let long = req.query.long;

    try {
        let tourInfo = await db.query('select * FROM (SELECT tourID, latitude, longitude, ( 6371 * acos( cos( radians( ? ) ) * cos( radians( latitude) ) * cos( radians( longitude ) - radians(?) ) + sin( radians(?) ) * sin( radians(latitude) ) ) ) AS distance from tours) DATA where DATA.distance < 1', [lat, long, lat]);
        if(tourInfo.length > 0){
            const returnObj = {
                tourInfo : tourInfo
            }
            res.status(httpStatus.OK).send(returnObj)
        } else{
            res.status(httpStatus.NOT_FOUND).send({message : 'There is not Data'})
        }
   } catch(error) {
        console.error(error, "tours api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
   }
}

//관광지 조회
async function getTour (req, res) {
    let id = req.params.id;

    try {
        let tourInfo = await db.query('select * from tours where tourID = ?', [id]);

        if(tourInfo.length > 0){
            const returnObj = {
                tourInfo : tourInfo
            }
            res.status(httpStatus.OK).send(returnObj)
        } else{
            res.status(httpStatus.NOT_FOUND).send()
        }
   } catch(error) {
        console.error(error, "tours api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
   }
}

// 관광지 생성
async function createTour(req, res) {
    console.log(req);


    const name = req.body.name;
    const addr = req.body.addr;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const phoneNum = req.body.phoneNum;
    // console.log(imgPath);
    try {
        let tourInfo = await db.query('Insert into tours (name, addr, latitude, longitude, phoneNum) VALUES (?, ?, ?, ?, ?)',[name, addr, latitude, longitude, phoneNum]);
        console.log(tourInfo);
        if(tourInfo.affectedRows > 0){
            const returnObj = {
                message : 'Success create tour'
            }
            res.status(httpStatus.OK).send(returnObj)
        } else{
            res.status(httpStatus.NOT_FOUND).send({message : 'Fail create tour'});
        }
   } catch(error) {
        console.error(error, "tours api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
   }
}

//관광지 업데이트
async function updateTour(req, res) {
    // console.log(req.file);
    // console.log(req.body);

    let id = req.params.id;
    // console.log(id);
    const name = req.body.name;
    const addr = req.body.addr;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const phoneNum = req.body.phoneNum;
    // console.log(imgPath);
    try {
        let tourInfo = await db.query('Update tours SET name=?, addr=?, latitude=?, longitude=?, phoneNum=? where tourID = ?',[name, addr, latitude, longitude, phoneNum, id]);

        if(tourInfo.affectedRows > 0){
            const returnObj = {
                message : 'Success update tour',
            }
            res.status(httpStatus.OK).send(returnObj)
        } else{
            res.status(httpStatus.NOT_FOUND).send({message : 'Fail update tour'});
        }
   } catch(error) {
        console.error(error, "tours api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
   }
}

async function deleteTour(req, res) {
    let id = req.params.id;
    try {
        let tourInfo = await db.query('delete from tours where tourID = ?', [id]);

        if(tourInfo.affectedRows > 0){
            const returnObj = {
                message : 'Success delete tour',
            }
            res.status(httpStatus.OK).send(returnObj)
        } else{
            res.status(httpStatus.NOT_FOUND).send({message : 'Fail delete tour'});
        }
   } catch(error) {
        console.error(error, "tours api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
   }
}

export default {
    getTourAll,
    getTour,
    createTour,
    updateTour,
    deleteTour,
}