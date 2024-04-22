import express from 'express';

const router = express.Router();

router.get("/test", (req, res) => {
    console.log("Hello World");
})
router.post("/test", (req, res) => {
    console.log("Hello World");
})
router.put("/test", (req, res) => {
    console.log("Hello World");
})
router.delete("/test", (req, res) => {
    console.log("Hello World");
})

export default router;