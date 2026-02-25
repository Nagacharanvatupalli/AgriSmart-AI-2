import express from 'express';
import Diagnosis from '../models/Diagnosis';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();

// Save a new diagnosis
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
    try {
        console.log('--- SAVE DIAGNOSIS ---');
        const { imageBase64, diagnosisResult, caseId } = req.body;

        if (!imageBase64 || !diagnosisResult || !caseId) {
            return res.status(400).json({ message: 'imageBase64, diagnosisResult, and caseId are required' });
        }

        const diagnosis = new Diagnosis({
            userId: req.userId,
            imageBase64,
            diagnosisResult,
            caseId,
        });

        const saved = await diagnosis.save();
        console.log('Diagnosis saved:', saved._id, 'caseId:', caseId);

        res.status(201).json({ message: 'Diagnosis saved successfully', diagnosis: saved });
    } catch (error) {
        console.error('Save diagnosis error:', error);
        res.status(500).json({ message: 'Server error saving diagnosis' });
    }
});

// Get diagnosis history for the logged-in user
router.get('/history', authMiddleware, async (req: AuthRequest, res) => {
    try {
        console.log('--- FETCH DIAGNOSIS HISTORY ---');
        console.log('User ID:', req.userId);

        const diagnoses = await Diagnosis.find({ userId: req.userId })
            .sort({ createdAt: -1 })
            .select('-__v');

        console.log(`Found ${diagnoses.length} diagnoses for user`);
        res.json(diagnoses);
    } catch (error) {
        console.error('Fetch diagnosis history error:', error);
        res.status(500).json({ message: 'Server error fetching diagnosis history' });
    }
});

export default router;
