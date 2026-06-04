import { Router, type IRouter } from "express";
import healthRouter from "./health";
import leadRouter from "./lead";
import contentRouter from "./content";
import leadsRouter from "./leads";
import productsRouter from "./products";
import storageRouter from "./storage";

const router: IRouter = Router();

router.use(healthRouter);
router.use(leadRouter);
router.use(contentRouter);
router.use(leadsRouter);
router.use(productsRouter);
router.use(storageRouter);

export default router;
