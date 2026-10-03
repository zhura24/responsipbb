// src/routes/loans.js
const express = require('express');
const router = express.Router();
const supabase = require('../db/supabaseClient');

// Helper to format error responses
function handleError(res, error) {
  console.error(error);
  return res.status(500).json({ error: error.message || 'Internal server error' });
}

// Create a new loan
router.post('/', async (req, res) => {
  const { member_id, book_id, borrowed_at, due_at, status } = req.body;
  const { data, error } = await supabase.from('loans').insert([
    { member_id, book_id, borrowed_at, due_at, status }
  ]);
  if (error) return handleError(res, error);
  return res.status(201).json(data[0]);
});

// Get all loans, optional filter by status
router.get('/', async (req, res) => {
  const { status } = req.query;
  let query = supabase.from('loans').select('*');
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) return handleError(res, error);
  return res.json(data);
});

// Get a loan by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('loans').select('*').eq('id', id).single();
  if (error) return handleError(res, error);
  return res.json(data);
});

// Update a loan by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body; // allow partial updates
  const { data, error } = await supabase.from('loans').update(updates).eq('id', id).select();
  if (error) return handleError(res, error);
  return res.json(data[0]);
});

// Delete a loan by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('loans').delete().eq('id', id).select();
  if (error) return handleError(res, error);
  return res.json({ message: 'Loan deleted', deleted: data[0] });
});

module.exports = router;
