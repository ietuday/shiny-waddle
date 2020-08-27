import express = require('express');

import ChannelController = require('../../../controller/channel/ChannelController');
import ValidateUser = require('../../middleware/ValidateUser');

const router = express.Router();

class ChannelRoutes {
    private _ChannelController: ChannelController;

    constructor() {
        this._ChannelController = new ChannelController();
    }

    get routes() {
        const controller = this._ChannelController;

 /**
         * @swagger
         * /api/v1/channel/create:
         *   post:
         *     tags:
         *       - Channel
         *     summary: create a Channel
         *     description: create password for satTv
         *     parameters:
         *       - name: Channel
         *         description: Channel data object
         *         in:  body
         *         required: true
         *         type: string
         *     produces:
         *       - application/json
         *     responses:
         *       201:
         *         description: Channel created successfully
         *       404:
         *         description: error
         */
        router.post("/create", controller.create);
         /**
         * @swagger
         * /api/v1/channel/retieve:
         *   get:
         *     tags:
         *       - Channel
         *     summary: Retieve Channel
         *     description: Retieve All Channels
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: All Channels
         *       404:
         *         description: error
         */
        router.get("/retieve", controller.retrieve);

         /**
         * @swagger
         * /api/v1/channel/find-by-id:
         *   post:
         *     tags:
         *       - Channel
         *     summary: Find Channel
         *     description: Find a Channel by id
         *     parameters:
         *       - name: Channel
         *         description: Channel data object
         *         in:  body
         *         required: true
         *         type: string
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Channel Detail
         *       404:
         *         description: error
         */
        router.post("/find-by-id", controller.findById);

        /**
         * @swagger
         * /api/v1/channel/update-by-id:
         *   put:
         *     tags:
         *       - Channel
         *     summary: Update Channel
         *     description: update a Channel by id
         *     parameters:
         *       - name: Channel
         *         description: Channel data object
         *         in:  body
         *         required: true
         *         type: string
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Channel updated successfully
         *       404:
         *         description: error
         */
        router.put("/update-by-id", controller.update);

          /**
         * @swagger
         * /api/v1/channel/delete-by-id:
         *   delete:
         *     tags:
         *       - Channel
         *     summary: Delete Channel
         *     description: Delete a Channel by id
         *     parameters:
         *       - name: Channel
         *         description: Channel data object
         *         in:  body
         *         required: true
         *         type: string
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Channel deleted successfully
         *       404:
         *         description: error
         */
        router.delete("/delete-by-id", controller.delete);

        return router;
    }
}

Object.seal(ChannelRoutes);
export = ChannelRoutes;