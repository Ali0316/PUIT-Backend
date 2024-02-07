const express = require('express');
const {getCards, getCard, createCard, approveCard, updateCard, deleteCard} = require('../controllers/cardController')
const {isAuthenticatedUser, isAdminUser} = require('../middleware/auth');
const router = express.Router();

router.route('/').get(isAuthenticatedUser, getCards);
router.route('/:id').get(getCard);
router.route('/create').post(isAuthenticatedUser, createCard);
router.route('/approve/:id').put(isAdminUser, approveCard);
router.route('/update/:id').put(isAdminUser, updateCard);
router.route('/delete/:id').delete(isAdminUser, deleteCard);

module.exports = router;