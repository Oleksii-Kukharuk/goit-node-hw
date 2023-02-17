const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return console.table(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const result = contacts.find((item) => item.id === String(contactId));
    return result
      ? console.log(result)
      : console.log(result, "contact not found");
  } catch (e) {
    console.log(e.message);
  }
};

const removeContact = async (id) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const idx = contacts.findIndex((item) => item.id === String(id));
    if (idx === -1) {
      return null;
    }
    const [removeContact] = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return console.table(removeContact);
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContact = {
      id: randomUUID(),
      name,
      email,
      phone,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return console.table(newContact);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
