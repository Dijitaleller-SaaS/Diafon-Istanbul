import { Router, type IRouter } from "express";
import healthRouter from "./health";
import leadRouter from "./lead";
import contentRouter from "./content";

const router: IRouter = Router();

router.use(healthRouter);
router.use(leadRouter);
router.use(contentRouter);

export default router;
