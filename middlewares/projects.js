const { check, validationResult } = require('express-validator');

const errorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

const validateProject = [
  check('name')
    .notEmpty()
    .withMessage('You need to enter a name!')
    .bail()
    .isString()
    .withMessage('Invalid type of Name')
    .bail(),

  check('description')
    .notEmpty()
    .withMessage('You need to enter a description!')
    .bail()
    .isString()
    .withMessage('Invalid type of Description')
    .bail(),

  check('projectManagerId')
    .optional({ nullable: true })
    .isNumeric()
    .withMessage('Invalid type of ProjectManagerId')
    .bail(),

  check('projectStatusId')
    .optional({ nullable: true })
    .isNumeric()
    .withMessage('Invalid type of ProjectStatusId')
    .bail(),

  check('assignees').isArray().withMessage('Invalid type of Assignees').bail(),
  errorHandler
];

module.exports = { validateProject };
