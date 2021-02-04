import db from '../middleware/db'
import httpStatus from 'http-status-codes'
import security from '../middleware/security'

// 게시글 조회
async function getAll (req, res) {
    console.log(req);

    try {
        let postInfo = await db.query('select * from posts', []);
        
        if(postInfo.length > 0){
            const returnObj = {
                postInfo : postInfo
            }
            res.status(httpStatus.OK).send(returnObj)
        } else{
            res.status(httpStatus.NOT_FOUND).send()
        }
   } catch(error) {
        console.error(error, "posts api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
   }
}

async function getPost (req, res) {
    let id = req.params.id;

    try {
        let postInfo = await db.query('select * from posts where postID = ?', [id]);

        if(postInfo.length > 0){
            const returnObj = {
                postInfo : postInfo
            }
            res.status(httpStatus.OK).send(returnObj)
        } else{
            res.status(httpStatus.NOT_FOUND).send()
        }
   } catch(error) {
        console.error(error, "posts api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
   }
}

// 게시글 작성
async function createPost(req, res) {
    const userID = req.body.userID;
    const categoryID = req.body.categoryID;
    const content = req.body.content;
    const imgPath = req.body.imgPath;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    
    try {
        let postInfo = await db.query('Insert into posts (userID, categoryID, content, timestamp, imgPath, latitude, longitude) VALUES (?, ?, ?, NOW(), ?, ?, ?)',[userID, categoryID, content, imgPath, latitude, longitude]);
        console.log(postInfo);

        if(postInfo.affectedRows > 0){
            const returnObj = {
                message : 'Success post',
                postInfo : postInfo
            }
            res.status(httpStatus.OK).send(returnObj)
        } else{
            res.status(httpStatus.NOT_FOUND).send({message : 'Fail post'});
        }
   } catch(error) {
        console.error(error, "posts api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
   }
}

async function updatePost(req, res) {
    let id = req.params.id;
    const categoryID = req.body.categoryID;
    const content = req.body.content;
    const imgPath = req.body.imgPath;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    
    try {
        let postInfo = await db.query('Update posts SET categoryID=?, content=?, imgPath=?, latitude=?, longitude=? where postID = ?',[categoryID, content, imgPath, latitude, longitude, id]);
        console.log(postInfo);

        if(postInfo.affectedRows > 0){
            const returnObj = {
                message : 'Success update',
                postInfo : postInfo
            }
            res.status(httpStatus.OK).send(returnObj)
        } else{
            res.status(httpStatus.NOT_FOUND).send({message : 'Fail update'});
        }
   } catch(error) {
        console.error(error, "posts api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
   }
}

async function deletePost(req, res) {
    let id = req.params.id;
    try {
        let postInfo = await db.query('delete from posts where postID = ?', [id]);
        console.log(postInfo);

        if(postInfo.affectedRows > 0){
            const returnObj = {
                message : 'Success delete',
                postInfo : postInfo
            }
            res.status(httpStatus.OK).send(returnObj)
        } else{
            res.status(httpStatus.NOT_FOUND).send({message : 'Fail delete'});
        }
   } catch(error) {
        console.error(error, "posts api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
   }
}

export default {
    getAll,
    getPost,
    createPost,
    updatePost,
    deletePost,
}