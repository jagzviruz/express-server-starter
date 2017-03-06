'use strict';
import express from 'express';
import * as controller from './dummy.controller';

const router = express.Router();
router.get('/', controller.index);
router.post('/', controller.save);

module.exports = exports = router;
