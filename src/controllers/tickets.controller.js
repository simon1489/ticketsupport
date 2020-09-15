const ticketsCtrl = {};

// Models
const Ticket = require("../models/Ticket");

ticketsCtrl.renderTicketForm = (req, res) => {
  res.render("tickets/new-ticket");
};

ticketsCtrl.createNewTicket = async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Please Write a Title." });
  }
  if (!description) {
    errors.push({ text: "Please Write a Description" });
  }
  if (errors.length > 0) {
    res.render("tickets/new-ticket", {
      errors,
      title,
      description,
    });
  } else {
    const newTicket = new Ticket({ title, description });
    newTicket.user = req.user.id;
    await newTicket.save();
    req.flash("success_msg", "Ticket Added Successfully");
    res.redirect("/tickets");
  }
};

ticketsCtrl.renderTickets = async (req, res) => {
  const tickets = await Ticket.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("tickets/all-tickets", { tickets });
};

ticketsCtrl.renderEditForm = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id).lean();
  if (ticket.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/tickets");
  }
  res.render("tickets/edit-ticket", { ticket });
};

ticketsCtrl.updateTicket = async (req, res) => {
  const { title, description } = req.body;
  await Ticket.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Ticket Updated Successfully");
  res.redirect("/tickets");
};

ticketsCtrl.deleteTicket = async (req, res) => {
  await Ticket.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Ticket Deleted Successfully");
  res.redirect("/tickets");
};

module.exports = ticketsCtrl;
