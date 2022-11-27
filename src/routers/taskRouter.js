import express from "express";
const router = express.Router();
// deflet this fakedb when integrate with database
let fakedb = [{_id: 1, task: "watching tv", hr:40, type: "entry"}];

router.get("/", (req, res) => {
  res.json({
    status:'success',
    message: "list of the task",
    fakedb,
  });
});

router.post("/", (req, res, next) => {
  try {
    const data = req.body;
    console.log(req.body);

    fakedb.push(data),
    res.json({
      status:'success',
      message: "New task has been added",
    });
  } catch (error) {
    error.code = 500;

    next(error);
  }
});

router.put("/", (req, res) => {
  res.json({
    message: "updating data to the db",
  });
});

router.patch("/", (req, res, next) => {
  const {_id, type}= req.body;
  try {
    // update
    fakedb.map(item =>{
      if (item._id === _id){
        item.type = type;
      }
      return item
    });
    res.json({
      status:"success",
      message: "updating data to the db",
  });
 } catch (error) {
    error.status = 500;
    next(error);
  } 
});
// use this method for single item to delete
// router.delete("/:_id", (req, res, next) =>{
  // this approach for multiple item to delete

router.delete("/", (req, res, next) =>{
  const _idArg= req.body;
  console.log(_idArg);

  fakedb = fakedb.filter(({_id}) => !_idArg.includes(_id));

  // replace following code by calling db function
// fakedb = fakedb.filter((item) => item._id != _id)
  try {
    // fakedb = fakedb.filter(({_id}) => !_idArg.includes(_id));
    res.json({
      status: "success",
      message: "delete successfully",

    });

  } catch (error) {
    error.status = 500;
    next(error);
    
  }
})


export default router;
