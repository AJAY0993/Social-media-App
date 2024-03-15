const addParticipants = (req, res, next) => {
  req.body.participants = [req.user.id, req.body.participant];
  next();
};

module.exports = { addParticipants };
