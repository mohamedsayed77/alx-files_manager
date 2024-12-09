import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

const router = Router();

// AppController endpoint definitions
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// UsersController endpoint definitions
router.post('/users', UsersController.postNew);

// AuthController endpoint definitions
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', UsersController.getMe);

// FilesController endpoint definitions
router.post('/files', FilesController.postUpload);

router.get('/files/:id', FilesController.getShow);
router.get('/files', FilesController.getIndex);

// Publishing and Unpublishing FilesController endpoint definitions
router.put('/files/:id/publish', FilesController.putPublish);
router.put('/files/:id/unpublish', FilesController.putUnpublish);

// File data endpoint definition
router.get('/files/:id/data', FilesController.getFile);

export default router;
