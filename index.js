const argv = require("yargs").argv;
console.log(argv);
const contactsMethods = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      await contactsMethods.listContacts();
      break;

    case "get":
      await contactsMethods.getContactById(id);
      break;

    case "add":
      await contactsMethods.addContact(name, email, phone);
      break;

    case "remove":
      await contactsMethods.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
