const express = require("express");
const router = express.Router();

// Controller
const {
  renderTicketForm,
  createNewTicket,
  renderTickets,
  renderEditForm,
  updateTicket,
  deleteTicket
} = require("../controllers/tickets.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// New Ticket
router.get("/tickets/add", isAuthenticated, renderTicketForm);

router.post("/tickets/new-ticket", isAuthenticated, createNewTicket);

// Get All Tickets
router.get("/tickets", isAuthenticated, renderTickets);

// Edit Tickets
router.get("/tickets/edit/:id", isAuthenticated, renderEditForm);

router.put("/tickets/edit-ticket/:id", isAuthenticated, updateTicket);

// Delete Tickets
router.delete("/tickets/delete/:id", isAuthenticated, deleteTicket);

module.exports = router;
