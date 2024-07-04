import express from 'express'
import { deleteAppointment, getAllApointments, postAppointment, updateAppointment } from '../controller/appointmentCtrl.js'
import {isAdminAuthenticated,isPatientAuthenticated} from '../middleware/auth.js'

const router = express.Router()

router.post('/post/appointment',isPatientAuthenticated,postAppointment)
router.get('/getAllAppointments',isAdminAuthenticated,getAllApointments)
router.put('/update/:id',isAdminAuthenticated,updateAppointment)
router.delete('/delete/:id',isAdminAuthenticated,deleteAppointment)

export default router