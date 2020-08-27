import express = require('express');

import PlanController = require('../../../controller/plan/PlanController');
import ValidatePlan = require('../../middleware/ValidateUser');

const router = express.Router();

class PlanRoutes {
    private _PlanController: PlanController;

    constructor() {
        this._PlanController = new PlanController();
    }

    get routes() {
        const controller = this._PlanController;
        /**
         * @swagger
         * /api/v1/plan/create:
         *   post:
         *     tags:
         *       - Plan
         *     summary: create a Plan
         *     description: create password for satTv
         *     parameters:
         *       - name: Plan
         *         description: Plan data object
         *         in:  body
         *         required: true
         *         type: string
         *     produces:
         *       - application/json
         *     responses:
         *       201:
         *         description: Plan created successfully
         *       404:
         *         description: error
         */
        router.post("/create", controller.create);
         /**
         * @swagger
         * /api/v1/plan/retieve:
         *   get:
         *     tags:
         *       - Plan
         *     summary: Retieve Plan
         *     description: Retieve All Plans
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: All Plans
         *       404:
         *         description: error
         */
        router.get("/retieve", controller.retrieve);

         /**
         * @swagger
         * /api/v1/plan/find-by-id:
         *   post:
         *     tags:
         *       - Plan
         *     summary: Find Plan
         *     description: Find a Plan by id
         *     parameters:
         *       - name: Plan
         *         description: Plan data object
         *         in:  body
         *         required: true
         *         type: string
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Plan Detail
         *       404:
         *         description: error
         */
        router.post("/find-by-id", controller.findById);

        /**
         * @swagger
         * /api/v1/plan/update-by-id:
         *   put:
         *     tags:
         *       - Plan
         *     summary: Update Plan
         *     description: update a Plan by id
         *     parameters:
         *       - name: Plan
         *         description: Plan data object
         *         in:  body
         *         required: true
         *         type: string
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Plan updated successfully
         *       404:
         *         description: error
         */
        router.put("/update-by-id", controller.update);

          /**
         * @swagger
         * /api/v1/plan/delete-by-id:
         *   delete:
         *     tags:
         *       - Plan
         *     summary: Delete Plan
         *     description: Delete a Plan by id
         *     parameters:
         *       - name: Plan
         *         description: Plan data object
         *         in:  body
         *         required: true
         *         type: string
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Plan deleted successfully
         *       404:
         *         description: error
         */
        router.delete("/delete-by-id", controller.delete);

        return router;
    }
}

Object.seal(PlanRoutes);
export = PlanRoutes;