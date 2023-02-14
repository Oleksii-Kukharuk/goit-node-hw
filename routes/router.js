const { Router } = require("express");
const req = require("express/lib/request");
const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");

const contactsPath = path.join(__dirname, "/../db/contacts.json");

const router = Router();

const getContactsList = async () => {
  return JSON.parse(await fs.readFile(contactsPath));
};

const writeContact = async (contacts) => {
  return await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

router.get("/contacts", async (req, res) => {
  try {
    const contacts = await getContactsList();
    res.status(200).json(contacts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/contacts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const contacts = await getContactsList();
    const contact = await contacts.find((contact) => contact.id === id);
    if (!contact) {
      return res.status(404).json({ message: "contact not found" });
    }
    res.status(200).json(contact);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/contacts", async (req, res) => {
  try {
    const body = req.body;
    const contacts = await getContactsList();

    const newContact = { id: randomUUID(), ...body };
    contacts.push(newContact);

    await writeContact(contacts);

    res.status(201).json({ newContact });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put("/contacts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const contacts = await getContactsList();

    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "contact not found" });
    }

    const newContact = { ...contacts[index], ...body };

    res.status(200).json({ newContact });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete("/contacts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const contacts = await getContactsList();

    const filtredContacts = contacts.filter((contact) => contact.id !== id);
    if (filtredContacts.length === contacts.length) {
      return res.status(404).json({ message: "contact not found" });
    }

    await writeContact(filtredContacts);

    res.status(200).json({ message: " contact was deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
